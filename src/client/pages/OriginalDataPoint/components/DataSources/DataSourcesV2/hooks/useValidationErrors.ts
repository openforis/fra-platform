import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { DataSourceValidationErrorsRecord } from 'meta/assessment/descriptionValue/dataSource'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { MessageParser } from 'meta/validations/messageParser'

import { useNationalDataPointValidation } from 'client/store/data/tableData/validations/hooks/nationalDataPoints'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

export const useValidationErrors = (props: Props): DataSourceValidationErrorsRecord => {
  const { nationalDataPoint } = props
  const { t } = useTranslation()
  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const displayHistory = useODPDisplayHistory()
  const validation = useNationalDataPointValidation({ uuid: nationalDataPoint.uuid })
  const dataSourceValidations = validation.dataSources

  return useMemo<DataSourceValidationErrorsRecord>(() => {
    if (!canEditCycleData || print || displayHistory) return {}

    const validationErrors: DataSourceValidationErrorsRecord = {}
    Object.entries(dataSourceValidations ?? {}).forEach(([uuid, dataSourceValidation]) => {
      validationErrors[uuid] = { reference: MessageParser.getMessages(t, dataSourceValidation.reference) }
    })

    return validationErrors
  }, [canEditCycleData, dataSourceValidations, displayHistory, print, t])
}
