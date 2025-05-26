import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from 'client/store/types'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
