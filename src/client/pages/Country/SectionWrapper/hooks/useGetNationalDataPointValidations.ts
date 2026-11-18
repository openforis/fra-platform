import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { SectionNames } from 'meta/assessment/section'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { Objects } from 'utils/objects'

import { useCountry } from 'client/store/area/hooks/country'
import { NationalDataPointValidationActions } from 'client/store/data/validations/nationalDataPoints/actions'
import { useNationalDataPointValidationsFetched } from 'client/store/data/validations/nationalDataPoints/hooks/nationalDataPoints'
import { useAppDispatch } from 'client/store/hooks'
import { useSection } from 'client/store/meta/hooks/sections'
import { useCanEdit, useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsDataExportView } from 'client/hooks/dataExport'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'

export const useGetNationalDataPointValidations = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const canEdit = useCanEditCycleData()
  const canEditTableData = useCanEdit(sectionName)
  const canEditDescriptions = useCanEdit(sectionName, CollaboratorEditPropertyType.descriptions)
  const canEditSection = canEditTableData || canEditDescriptions
  const section = useSection(sectionName)
  const country = useCountry(countryIso)
  const isDataExportView = useIsDataExportView()
  const fetched = useNationalDataPointValidationsFetched()
  const { print } = useIsPrintRoute()

  const hasOriginalDataPoint = Boolean(country?.props?.forestCharacteristics?.useOriginalDataPoint)
  const isExtentOfForest = sectionName === SectionNames.extentOfForest
  const isForestCharacteristics = sectionName === SectionNames.forestCharacteristics && hasOriginalDataPoint
  const isNationalDataPointSection = isExtentOfForest || isForestCharacteristics
  const shouldFetch =
    !isDataExportView &&
    !fetched &&
    !print &&
    canEdit &&
    canEditSection &&
    !Objects.isEmpty(section) &&
    isNationalDataPointSection

  useEffect(() => {
    if (!shouldFetch) return

    dispatch(
      NationalDataPointValidationActions.getValidations({
        assessmentName,
        cycleName,
        countryIso,
        sectionName,
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName, shouldFetch])
}
