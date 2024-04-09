import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { DataSource } from 'meta/assessment'

import { useCanEditCycleData } from 'client/store/user'
import { EditorValidators } from 'client/components/EditorWYSIWYG'

type Returned = string

type Props = {
  dataSource: DataSource
}

export const useValidationError = (props: Props): Returned => {
  const { dataSource } = props
  const { t } = useTranslation()
  const editor = useCanEditCycleData()

  const validationError = useMemo<Returned>(() => {
    if (!dataSource.placeholder && Objects.isEmpty(dataSource.reference)) return t('generalValidation.notEmpty')

    if (editor && !EditorValidators.links(dataSource.reference)) return t('generalValidation.invalidLink')

    return ''
  }, [dataSource.placeholder, dataSource.reference, editor, t])

  return validationError
}
