import { useAppSelector } from 'client/store'

export const useIsAppInitialized = () => useAppSelector((state) => state.assessment.appInitialized)
