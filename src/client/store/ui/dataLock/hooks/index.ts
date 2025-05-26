import { useAppSelector } from 'client/store/hooks'

export const useIsDataLocked = (): boolean => useAppSelector((state) => state.ui?.dataLock?.locked)
