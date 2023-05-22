import { useOriginalDataPointData } from './useOriginalDataPointData'

export const useOriginalDataPointYears = (): Array<{ year: string; id: number }> => {
  const odpData = useOriginalDataPointData()

  if (!odpData) return null

  return Object.entries(odpData).map(([year, data]) => ({
    year,
    id: data.total.odpId,
  }))
}
