import { useAppSelector } from 'client/store'

export const useIsDataLocked = (): boolean => useAppSelector((state) => state.ui?.dataLock?.locked)
