import {View, Text, FlatList, Button, Image} from 'react-native';
import React, {useEffect} from 'react';
import CartCard from '../components/CartCard';
import {useSelector} from 'react-redux';
import {t} from 'i18next';

const Cart = ({navigation}) => {
  const cartData = useSelector(state => state.cart);
  let total = 0;
  useEffect(() => {
    cartData.forEach(function (x) {
      total += x.price;
    });
  }, []);
  return cartData.length ? (
    <>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 30,
          fontWeight: '900',
          backgroundColor: '#B6F9F8',
          color: '#AB6A1B',
          padding: 10,
          borderRadius: 15,
        }}>
        {t('cart_item_list')}
      </Text>
      <FlatList
        data={cartData}
        renderItem={({item}) => <CartCard item={item} />}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{marginVertical: 10}} />}
      />
      <Button
        title={t('buy_now')}
        onPress={() => navigation.navigate('Payment', {total: total})}
      />
    </>
  ) : (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
      }}>
      <Image
        style={{height: 250, width: 250}}
        source={require('../assets/cart.png')}
      />
      <Button
        title={t('add_items_to_cart')}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default Cart;
