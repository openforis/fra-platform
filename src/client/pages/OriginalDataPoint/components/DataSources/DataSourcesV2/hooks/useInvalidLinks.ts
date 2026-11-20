import { useMemo } from 'react'

import { Validations } from 'meta/assessment/validation/validations/validations'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useNationalDataPointValidation } from 'client/store/data/validations/nationalDataPoints/hooks/nationalDataPoints'
import { DataSourcesInvalidLinks } from 'client/components/DataSources/types'
import { useShowNDPValidationErrors } from 'client/pages/OriginalDataPoint/components/hooks/useShowNDPValidationErrors'

type Returned = DataSourcesInvalidLinks

export const useInvalidLinks = (): Returned => {
  const showValidationErrors = useShowNDPValidationErrors()
  const nationalDataPoint = useOriginalDataPoint()
  const validation = useNationalDataPointValidation({ uuid: nationalDataPoint.uuid })
  const dataSourceValidations = validation.dataSources

  return useMemo<Returned>(() => {
    if (!showValidationErrors) return {}

    const invalidLinks: Returned = {}
    Object.entries(dataSourceValidations ?? {}).forEach(([uuid, dataSourceValidation]) => {
      invalidLinks[uuid] = Validations.getInvalidLinks(dataSourceValidation.reference)
    })

    return invalidLinks
  }, [dataSourceValidations, showValidationErrors])
}
