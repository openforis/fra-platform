import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { DataSource } from 'meta/assessment/descriptionValue'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'

import { useCanEdit } from 'client/store/user/hooks/auth'
import { useSectionContext } from 'client/pages/Section/context'

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
  const { sectionName } = useSectionContext()
  const canEdit = useCanEdit(sectionName, CollaboratorEditPropertyType.descriptions)

  const { placeholder, reference, type, variables, year } = dataSource

  return useMemo<Returned>(() => {
    const getErrorMessage = (value: DataSource[keyof DataSource]): string => {
      if (canEdit && !placeholder && Objects.isEmpty(value)) return t('generalValidation.notEmpty')
      return ''
    }

    return {
      comments: undefined,
      reference: getErrorMessage(reference),
      type: getErrorMessage(type),
      variables: getErrorMessage(variables),
      year: getErrorMessage(year),
    }
  }, [canEdit, placeholder, reference, t, type, variables, year])
}
