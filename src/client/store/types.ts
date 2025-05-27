import store from 'client/store/store'

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type ThunkApiConfig = { dispatch: AppDispatch; state: RootState }
