import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { SectionNames } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { useCountry } from 'client/store/area/hooks/country'
import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsDataExportView } from 'client/hooks/dataExport'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'

export const useGetNationalDataPointValidations = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const canEdit = useCanEditCycleData()
  const country = useCountry(countryIso)
  const isDataExportView = useIsDataExportView()
  const { print } = useIsPrintRoute()

  const hasOriginalDataPoint = Boolean(country?.props?.forestCharacteristics?.useOriginalDataPoint)
  const isExtentOfForest = sectionName === SectionNames.extentOfForest
  const isForestCharacteristics = sectionName === SectionNames.forestCharacteristics && hasOriginalDataPoint
  const isNationalDataPointSection = isExtentOfForest || isForestCharacteristics

  useEffect(() => {
    if (isDataExportView || print || !canEdit || Objects.isEmpty(sectionName) || !isNationalDataPointSection) {
      return
    }

    dispatch(ValidationsActions.getNationalDataPointValidations({ assessmentName, cycleName, countryIso, sectionName }))
  }, [
    assessmentName,
    canEdit,
    countryIso,
    cycleName,
    dispatch,
    isDataExportView,
    isNationalDataPointSection,
    print,
    sectionName,
  ])
}
