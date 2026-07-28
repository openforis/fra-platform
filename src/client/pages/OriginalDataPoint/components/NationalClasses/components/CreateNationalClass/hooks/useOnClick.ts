import { useCallback } from 'react'

import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useUpdateNationalClasses } from 'client/pages/OriginalDataPoint/components/NationalClasses/components/hooks/useUpdateNationalClasses'

type Returned = () => void

export const useOnClick = (): Returned => {
  const originalDataPoint = useOriginalDataPoint()
  const updateNationalClasses = useUpdateNationalClasses()

  return useCallback<Returned>(() => {
    const nationalClasses = [...originalDataPoint.nationalClasses, ODPNationalClassFactory.newNationalClass()]
    updateNationalClasses({ ...originalDataPoint, nationalClasses })
  }, [originalDataPoint, updateNationalClasses])
}
