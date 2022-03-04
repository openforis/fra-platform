import { useAppSelector } from '@client/store'

export const useOriginalDataPoint = () => useAppSelector((state) => state.pages.originalDataPoint?.data)

export const useIsOriginalDataPointUpdating = () => useAppSelector((state) => state.pages.originalDataPoint?.updating)
