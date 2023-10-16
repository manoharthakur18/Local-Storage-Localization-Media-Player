import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../redux/CartSlice';
import { t } from 'i18next';

const CartCard = ({item}) => {
  const disptach = useDispatch();
  const removeItem = id => {
    disptach(removeFromCart(id));
  };
  return (
    <View style={styles.itemStyle}>
      <Image style={styles.imgStyle} source={{uri: item.image}} />
      <View style={styles.details}>
        <Text style={styles.price}>₹ {item.price}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <TouchableOpacity
          style={{
            height: 30,
            width: '30%',
            alignSelf: 'flex-end',
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            removeItem(item.id);
          }}>
          <Text style={{fontSize: 18, fontWeight: '900', color: 'white'}}>
            {t('remove')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
  },
  details: {
    margin: 10,
    width: '75%',
  },
  imgStyle: {
    width: '20%',
    height: 100,
    resizeMode: 'contain',
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
