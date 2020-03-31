import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createDebounce from 'redux-debounced'
import { batchStoreEnhancer, batchMiddleware } from './reduxBatch'

import axiosErrorsMiddleware from './axiosErrorMiddleware'
import reducer from './rootReducer'

const composeEnhancers =
  process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const middleware = [createDebounce(), thunkMiddleware, axiosErrorsMiddleware, batchMiddleware]
const enhancer = composeEnhancers(applyMiddleware(...middleware), batchStoreEnhancer)

const createReducer = (asyncReducers) =>
  combineReducers({
    ...reducer,
    ...asyncReducers,
  })

const store = createStore(createReducer({}), enhancer)

store.asyncReducers = {}

export const injectReducers = (name, asyncReducer) => {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}

export default store
