const {configureStore, combineReducers} = require('@reduxjs/toolkit');
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import cartReducer from './CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

let percistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

let persistedReducer = persistReducer(percistConfig, rootReducer);

const myStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(myStore);

export default myStore;
