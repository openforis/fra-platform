import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { injectSlice, reducer } from 'client/store/store'
import { AppDispatch, RootState } from 'client/store/types'
import { useOnMount } from 'client/hooks/onMount'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useInjectSlice = (slice: Parameters<typeof reducer.inject>[0]) => {
  useOnMount(() => {
    injectSlice(slice)
  })
}
