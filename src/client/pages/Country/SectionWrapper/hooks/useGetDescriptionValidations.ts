import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { Objects } from 'utils/objects'

import { ValidationsActions } from 'client/store/data/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEdit } from 'client/store/user/hooks/auth'
import { useIsDataExportView } from 'client/hooks/dataExport'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'

type Props = {
  sectionName: string
}

export const useGetDescriptionValidations = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEdit = useCanEdit(sectionName, CollaboratorEditPropertyType.descriptions)
  const isDataExportView = useIsDataExportView()
  const { print } = useIsPrintRoute()

  useEffect(() => {
    if (isDataExportView || print || !canEdit || Objects.isEmpty(sectionName)) {
      return
    }

    dispatch(ValidationsActions.getDescriptionValidations({ assessmentName, cycleName, countryIso, sectionName }))
  }, [assessmentName, canEdit, countryIso, cycleName, dispatch, isDataExportView, print, sectionName])
}
