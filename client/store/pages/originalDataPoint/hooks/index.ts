import { useAppSelector } from '@client/store'

export const useOriginalDataPoint = () => useAppSelector((state) => state.pages.originalDataPoint?.data)

export const useIsOriginalDataPointLoading = () => useAppSelector((state) => state.pages.originalDataPoint?.loading)
