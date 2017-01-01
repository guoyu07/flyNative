import { createStore, combineReducers, applyMiddleware  } from 'redux'
import Reducers from './reducers.js'
import createSagaMiddleware  from 'redux-saga'
import Saga from './saga'

const middlewares = [];
const createLogger = require('redux-logger');

const sagaMiddleWare = createSagaMiddleware()
middlewares.push(sagaMiddleWare);

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    predicate: (getState, action) => !/REACT_NATIVE_ROUTER_FLUX/.test(action.type)
  });
  middlewares.push(logger);
}

let store = createStore(combineReducers(Reducers), applyMiddleware(...middlewares))

sagaMiddleWare.run(Saga)

export default store
