import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Combinereducer';
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [''],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(Store);

//const store = createStore(rootReducer,);
module.exports = {Store, persistor};
// export default store;
