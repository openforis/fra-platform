import { useOriginalDataPointData } from './useOriginalDataPointData'

export const useOriginalDataPointYears = () => {
  const odpData = useOriginalDataPointData()

  if (!odpData) return null

  return Object.entries(odpData).map(([year, data]) => ({
    year,
    id: data.total.odpId,
  }))
}
