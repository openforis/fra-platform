import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { DataSource } from 'meta/assessment/descriptionValue'
import type { DataSourceValidationField } from 'meta/assessment/validation/description'
import { MessageParser } from 'meta/validations/messageParser'
import { Objects } from 'utils/objects'

import { useDataSourceValidation } from 'client/store/data/tableData/validations/hooks/descriptions'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { useSectionContext } from 'client/pages/Section/context'

type Props = {
  dataSource: DataSource
}

type Returned = {
  comments: undefined
  reference: Array<string>
  type: string
  variables: string
  year: string
}

type RequiredField = Exclude<DataSourceValidationField, 'reference'>

export const useValidationErrors = (props: Props): Returned => {
  const { dataSource } = props
  const { t } = useTranslation()
  const { sectionName } = useSectionContext()
  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const dataSourceValidation = useDataSourceValidation({ sectionName, uuid: dataSource.uuid })

  return useMemo<Returned>(() => {
    const empty: Returned = { comments: undefined, reference: [], type: '', variables: '', year: '' }
    if (!canEditCycleData || print) return empty

    const getReferenceErrors = (): Array<string> => {
      const validation = dataSourceValidation.reference

      if (!validation || validation.valid || Objects.isEmpty(validation.messages)) return []

      return validation.messages.map((message) => MessageParser.getMessage(t, message))
    }

    const getRequiredFieldError = (field: RequiredField): string => {
      const validation = dataSourceValidation[field]

      if (!validation || validation.valid || Objects.isEmpty(validation.messages)) return ''

      const [message] = validation.messages
      return MessageParser.getMessage(t, message)
    }

    return {
      comments: undefined,
      reference: getReferenceErrors(),
      type: getRequiredFieldError('type'),
      variables: getRequiredFieldError('variables'),
      year: getRequiredFieldError('year'),
    }
  }, [canEditCycleData, dataSourceValidation, print, t])
}
