import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { DataSourceValidationErrorsRecord } from 'meta/assessment/descriptionValue/dataSource'
import { SectionName } from 'meta/assessment/section'
import type { DataSourceValidation, DataSourceValidationField } from 'meta/assessment/validation/description'
import { MessageParser } from 'meta/validations/messageParser'
import { Objects } from 'utils/objects'

import { useDataSourceValidations } from 'client/store/data/tableData/validations/hooks/descriptions'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'

type Props = {
  sectionName: SectionName
}

type RequiredField = Exclude<DataSourceValidationField, 'reference'>

export const useValidationErrors = (props: Props): DataSourceValidationErrorsRecord => {
  const { sectionName } = props
  const { t } = useTranslation()
  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const dataSourceValidations = useDataSourceValidations({ sectionName })

  return useMemo<DataSourceValidationErrorsRecord>(() => {
    if (!canEditCycleData || print) return {}

    const getReferenceErrors = (dataSourceValidation: DataSourceValidation): Array<string> => {
      const validation = dataSourceValidation.reference

      if (!validation || validation.valid || Objects.isEmpty(validation.messages)) return []

      return validation.messages.map((message) => MessageParser.getMessage(t, message))
    }

    const getRequiredFieldError = (dataSourceValidation: DataSourceValidation, field: RequiredField): string => {
      const validation = dataSourceValidation[field]

      if (!validation || validation.valid || Objects.isEmpty(validation.messages)) return ''

      const [message] = validation.messages
      return MessageParser.getMessage(t, message)
    }

    return Object.entries(dataSourceValidations).reduce<DataSourceValidationErrorsRecord>(
      (acc, [uuid, dataSourceValidation]) => {
        acc[uuid] = {
          reference: getReferenceErrors(dataSourceValidation),
          type: getRequiredFieldError(dataSourceValidation, 'type'),
          variables: getRequiredFieldError(dataSourceValidation, 'variables'),
          year: getRequiredFieldError(dataSourceValidation, 'year'),
        }

        return acc
      },
      {}
    )
  }, [canEditCycleData, dataSourceValidations, print, t])
}
