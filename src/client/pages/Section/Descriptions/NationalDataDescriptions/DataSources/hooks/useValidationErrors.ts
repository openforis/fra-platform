import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { DataSource } from 'meta/assessment'

type Props = {
  dataSource: DataSource
}

type Returned = {
  comments: undefined
  reference: string
  type: string
  variables: string
  year: string
}

export const useValidationErrors = (props: Props): Returned => {
  const { dataSource } = props
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const getErrorMessage = (value: DataSource[keyof DataSource]) => {
      if (!dataSource.placeholder && Objects.isEmpty(value)) return t('generalValidation.notEmpty')
      return ''
    }

    return {
      comments: undefined,
      reference: getErrorMessage(dataSource.reference),
      type: getErrorMessage(dataSource.type),
      variables: getErrorMessage(dataSource.variables),
      year: getErrorMessage(dataSource.year),
    }
  }, [dataSource.placeholder, dataSource.reference, dataSource.type, dataSource.variables, dataSource.year, t])
}
