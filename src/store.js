import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/root.reducer';

const middlewares = [];

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
