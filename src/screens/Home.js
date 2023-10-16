import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
import {useSelector} from 'react-redux';
import LanguageModal from '../components/LanguageModal';
import ProductCard from '../components/ProductCard';

var db = openDatabase({name: 'ProductDatabase.db'});

const Home = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const [products, setProducts] = useState();
  const cartData = useSelector(state => state.cart);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLanguageSelect = language => {
    setIsModalVisible(false);
    saveSelectedLang(language);
    i18n.changeLanguage(language);
  };

  const saveSelectedLang = async lang => {
    await AsyncStorage.setItem('LANG', lang)
      .then(() => {
        console.log('Language saved successfully');
      })
      .catch(error => {
        console.error('Error saving data: ', error);
      });
  };

  const netInfo = useNetInfo();
  let isConnected = netInfo.isConnected;
  // let isConnected = false;

  const getLang = async () => {
    await AsyncStorage.getItem('LANG')
      .then(storedLang => {
        if (storedLang !== null) {
          console.log('Stored LANG:', storedLang);
          i18n.changeLanguage(storedLang);
        } else {
          console.log('LANG data not found');
        }
      })
      .catch(error => {
        console.error('Error retrieving data: ', error);
      });
  };

  useEffect(() => {
    getLang();
  }, []);

  useEffect(() => {
    if (isConnected !== null) {
      console.log('isConnected: ', isConnected);
      createTable();
      isConnected ? getAPIData() : getData();
      console.log('end');
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      saveData();
    }
  }, [products]);

  const getAPIData = () => {
    axios.get('https://fakestoreapi.com/products').then(res => {
      setProducts(res.data);
    });
  };

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_products'",
        [],
        (tx, res) => {
          var len = res.rows.length;
          for (let i = 0; i < len; i++) {
            let row = res.rows.item(i);
            console.log(`Table name: ${row.name}`);
          }
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_products', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_products(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, description TEXT, image TEXT)',
              [],
            );
          } else {
            console.log('already created table');
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const getData = () => {
    db.transaction(tnx => {
      tnx.executeSql('SELECT * FROM table_products', [], (tx, res) => {
        console.log(res);
        const temp = [];
        for (let index = 0; index < res.rows.length; index++) {
          // console.log('item:-  ', res.rows.item(index));
          temp.push(res.rows.item(index));
        }
        setProducts(temp);
      });
    });
  };

  const saveData = () => {
    db.transaction(tnx => {
      tnx.executeSql('DELETE FROM table_products', [], (tx, res) => {
        console.log('Table data deleted');
        products.forEach(product => {
          // console.log('product', product.id);
          tx.executeSql(
            'INSERT INTO table_products (id, title, price,description,image) VALUES (?,?,?,?,?)',
            [
              product.id,
              product.title,
              product.price,
              product.description,
              product.image,
            ],
            (tx, results) => {
              // console.log('Results', results.rowsAffected);
              console.log('results :- ', results);
              if (results.rowsAffected > 0) {
                console.log('Data saved Successfully');
              } else alert('Registration Failed');
            },
            error => {
              console.log(error);
            },
          );
        });
      });
    });
  };

  return (
    <View>
      {/* {console.log(t('cart_item_list'), selectedLanguage)} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 5,
        }}>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={{height: 45, width: 45}}
            source={require('../assets/translation.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MediaPlayer');
          }}>
          <Image
            style={{height: 45, width: 45}}
            source={require('../assets/video.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }}
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <Image
            style={{height: 45, width: 45, zIndex: 5}}
            source={require('../assets/trolley.png')}
          />
          <Text style={{fontSize: 20, fontWeight: '900'}}>
            {cartData.length}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductCard item={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={'2'}
      />
      <LanguageModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onLanguageSelect={handleLanguageSelect}
      />
    </View>
  );
};

export default Home;
