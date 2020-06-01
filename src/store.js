import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducers/root.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
  const store = createStore(enhancedReducer, composeWithDevTools(applyMiddleware(thunk)));
  const persistor = persistStore(store);

  return { store, persistor };
};
