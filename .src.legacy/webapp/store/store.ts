import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import createDebounce from 'redux-debounced'
import { RootState } from './RootState'
import rootReducer from './rootReducer'
import axiosErrorsMiddleware from './axiosErrorMiddleware'

import { batchStoreEnhancer, batchMiddleware } from './reduxBatch'

const store = configureStore({
  reducer: rootReducer,
  enhancers: [batchStoreEnhancer],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createDebounce(), axiosErrorsMiddleware, batchMiddleware),
})
const asyncReducers: any = {}

export const injectReducers = (name: string, asyncReducer: any) => {
  asyncReducers[name] = asyncReducer

  store.replaceReducer(combineReducers({ ...rootReducer, ...asyncReducers }))
}

export type AppDispatch = typeof store.dispatch
export type ActionHandlers<S> = Record<string, (state: S, action: any) => S>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
