import { Objects } from 'utils/objects'

import { useOriginalDataPointData } from './useOriginalDataPointData'

export const useOriginalDataPointYears = (): Array<{ year: string; id: number }> => {
  const odpData = useOriginalDataPointData()

  if (Objects.isEmpty(odpData)) return null

  return Object.entries(odpData).map(([year, data]) => ({
    year,
    id: data.totalLandArea.odpId,
  }))
}
