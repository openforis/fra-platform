import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource, DataSourceValidator } from 'meta/assessment/descriptionValue/dataSource'
import { Objects } from 'utils/objects'

import { getLinkValidationError } from 'client/components/EditorWYSIWYG/hooks/useLinkValidationErrors'

export const useDataSourceValidator = (): DataSourceValidator => {
  const { t } = useTranslation()

  return useCallback<DataSourceValidator>(
    (dataSource) => {
      const { placeholder, reference, type, variables, year } = dataSource

      if (placeholder) return {}

      const getErrorMessage = (value: DataSource[keyof DataSource]): string => {
        if (Objects.isEmpty(value)) return t('generalValidation.notEmpty')
        return ''
      }

      const getReferenceError = (): string => {
        const validationError = getLinkValidationError({ enabled: true, t, value: reference })

        if (!Objects.isEmpty(validationError)) {
          return validationError
        }

        return getErrorMessage(reference)
      }

      return {
        comments: undefined,
        reference: getReferenceError(),
        type: getErrorMessage(type),
        variables: getErrorMessage(variables),
        year: getErrorMessage(year),
      }
    },
    [t]
  )
}
