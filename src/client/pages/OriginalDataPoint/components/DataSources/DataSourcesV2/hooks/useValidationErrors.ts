import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { DataSourceValidationErrorsRecord } from 'meta/assessment/descriptionValue/dataSource'
import { MessageParser } from 'meta/validations/messageParser'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useNationalDataPointValidation } from 'client/store/data/validations/hooks/nationalDataPoints'
import { useShowNDPValidationErrors } from 'client/pages/OriginalDataPoint/components/hooks/useShowNDPValidationErrors'

export const useValidationErrors = (): DataSourceValidationErrorsRecord => {
  const { t } = useTranslation()
  const showValidationErrors = useShowNDPValidationErrors()
  const nationalDataPoint = useOriginalDataPoint()
  const validation = useNationalDataPointValidation({ uuid: nationalDataPoint.uuid })
  const dataSourceValidations = validation.dataSources

  return useMemo<DataSourceValidationErrorsRecord>(() => {
    if (!showValidationErrors) return {}

    const validationErrors: DataSourceValidationErrorsRecord = {}
    Object.entries(dataSourceValidations ?? {}).forEach(([uuid, dataSourceValidation]) => {
      validationErrors[uuid] = { reference: MessageParser.getMessages(t, dataSourceValidation.reference) }
    })

    return validationErrors
  }, [dataSourceValidations, showValidationErrors, t])
}
