import { useOriginalDataPointData } from './useOriginalDataPointData'

export const useOriginalDataPointYears = () => {
  const odpData = useOriginalDataPointData()
  if (!odpData) return null
  return Object.keys(odpData)
}
