import {View, Text, Alert, Button} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearCart} from '../redux/CartSlice';
import {t} from 'i18next';

const Payment = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {total} = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: '900', marginBottom: 10}}>
        {t('your_total_amount_is')} {total}
      </Text>
      <Button
        title={t('cash_on_delivery')}
        onPress={() =>
          Alert.alert(
            t('payment_confirmation'),
            t('payment_done_via_cash_on_delivery'),
            [
              {
                text: 'OK',
                onPress: () => {
                  dispatch(clearCart());
                  navigation.navigate('Home');
                },
              },
            ],
          )
        }
      />
      <View style={{margin: 10}} />
      <Button
        title={t('online_payment')}
        onPress={() =>
          Alert.alert(
            t('payment_confirmation'),
            t('payment_done_via_online_payment'),
            [
              {
                text: 'OK',
                onPress: () => {
                  dispatch(clearCart());
                  navigation.navigate('Home');
                },
              },
            ],
          )
        }
      />
    </View>
  );
};

export default Payment;
