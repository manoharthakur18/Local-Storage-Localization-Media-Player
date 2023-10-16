import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppStack from './src/AppStack';
import myStore, {persistor} from './src/redux/store';

const App = () => {
  return (
    <Provider store={myStore}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {},
});
