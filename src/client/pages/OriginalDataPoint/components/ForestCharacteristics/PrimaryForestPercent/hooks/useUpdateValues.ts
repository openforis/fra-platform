import { useCallback } from 'react'

import { Objects } from 'utils/objects'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useUpdateOriginalData } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalData'

type Props = { field: string; value: string }
type Returned = (props: Props) => void

export const useUpdateValues = (): Returned => {
  const originalDataPoint = useOriginalDataPoint()
  const updateOriginalData = useUpdateOriginalData()

  return useCallback<Returned>(
    (props: Props) => {
      const { field, value } = props
      const path = ['values', field]
      const odp = Objects.setInPath({ obj: Objects.cloneDeep(originalDataPoint), path, value })
      updateOriginalData(odp)
    },
    [originalDataPoint, updateOriginalData]
  )
}
