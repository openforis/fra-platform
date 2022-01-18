import { useAppSelector } from '@client/store'

export const useOriginalDataPoint = () => useAppSelector((state) => state.data.originalDataPoint)
