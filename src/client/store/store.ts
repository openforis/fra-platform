import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createDebounce from 'redux-debounced'

import axiosMiddleware from './middleware/axios'
import { listenerMiddleware } from './middleware/listener'
import rootReducer from './rootReducer'
import { RootState } from './RootState'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(createDebounce(), axiosMiddleware),
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
