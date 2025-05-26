import { useAppSelector } from 'client/store/hooks'

export const useIsAppInitialized = () => useAppSelector((state) => state.assessment.appInitialized)
