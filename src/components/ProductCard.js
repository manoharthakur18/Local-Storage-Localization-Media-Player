import { t } from 'i18next';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';

const ProductCard = ({item}) => {
  const dispatch = useDispatch();

  const addItem = item => {
    dispatch(addToCart(item));
  };

  return (
    <View style={styles.itemStyle}>
      <Image style={styles.imgStyle} source={{uri: item.image}} />
      <Text style={styles.price}>₹ {item.price}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.desc} numberOfLines={3}>
        {item.description}
      </Text>
      <Button title={t('add_to_cart')} onPress={() => addItem(item)} />
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  price: {
    fontSize: 20,
    fontWeight: '900',
  },
  itemStyle: {
    width: '50%',
    padding: 5,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  desc: {
    fontSize: 14,
  },
  imgStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
