import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { rootReducer } from './reducers/root.reducer';

const middlewares = [ logger ];

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
