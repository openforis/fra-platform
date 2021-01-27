import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import createDebounce from 'redux-debounced'
import { batchStoreEnhancer, batchMiddleware } from './reduxBatch'
import axiosErrorsMiddleware from './axiosErrorMiddleware'
import reducer from './rootReducer'

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose
const middleware = [createDebounce(), thunkMiddleware, axiosErrorsMiddleware, batchMiddleware]
const enhancer = composeEnhancers(applyMiddleware(...middleware), batchStoreEnhancer)
const createReducer = (asyncReducers: any) =>
  combineReducers({
    ...reducer,
    ...asyncReducers,
  })
const store = createStore(createReducer({}), enhancer)
;(store as any).asyncReducers = {}
export const injectReducers = (name: any, asyncReducer: any) => {
  ;(store as any).asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer((store as any).asyncReducers))
}
export default store
