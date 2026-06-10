import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { Objects } from 'utils/objects'

import { useCanEdit, useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { getLinkValidationError } from 'client/components/EditorWYSIWYG/hooks/useLinkValidationErrors'
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
  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()

  const { placeholder, reference, type, variables, year } = dataSource

  return useMemo<Returned>(() => {
    const getErrorMessage = (value: DataSource[keyof DataSource]): string => {
      if (canEdit && !placeholder && Objects.isEmpty(value)) return t('generalValidation.notEmpty')
      return ''
    }

    const getReferenceError = (): string => {
      const validationError = getLinkValidationError({ enabled: canEditCycleData && !print, t, value: reference })

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
  }, [canEdit, canEditCycleData, placeholder, print, reference, t, type, variables, year])
}
