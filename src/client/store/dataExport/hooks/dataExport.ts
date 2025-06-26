import { Objects } from 'utils/objects'

import { Areas, Country, RegionCode } from 'meta/area'
import { Cycles } from 'meta/assessment/cycles'
import { Users } from 'meta/user'

import { useCountries } from 'client/store/area/hooks/countries'
import { DataExportActions } from 'client/store/dataExport/actions'
import { DataExportSelectors } from 'client/store/dataExport/selectors'
import { DataExportSelection } from 'client/store/dataExport/state'
import { useAppDispatch, useAppSelector } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useGlobalCountries } from 'client/store/ui/countryReport/hooks/globalCountries'
import { useUser, useUserCountries } from 'client/store/user/hooks/user'
import { useCountryIso } from 'client/hooks'

export const useDataExportCountries = (): Array<Country> => {
  const dispatch = useAppDispatch()
  // const assessmentType = useAssessmentType()
  const countries = useAppSelector((state) => DataExportSelectors.getCountries(state))

  // if (assessmentType === AssessmentType.panEuropean) {
  //   return useCountriesPanEuropean()
  // }

  const countryIso = useCountryIso()
  const countriesAll = useCountries()
  const countriesFilter = useGlobalCountries()
  const cycle = useCycle()
  const user = useUser()
  const userCountries = useUserCountries()

  // initialize data export countries
  if (Objects.isEmpty(countries)) {
    let countriesDataExport = countriesAll
    if (!Cycles.isPublished(cycle) && !Users.isAdministrator(user)) {
      countriesDataExport = countriesDataExport.filter((country) => userCountries.includes(country.countryIso))
    }
    if (Areas.isRegion(countryIso)) {
      countriesDataExport = countriesAll.filter((country) => country.regionCodes.includes(countryIso as RegionCode))
    }
    if (!Objects.isEmpty(countriesFilter)) {
      countriesDataExport = countriesAll.filter((country) => countriesFilter.includes(country.countryIso))
    }

    dispatch(DataExportActions.updateCountries(countriesDataExport))
  }

  return countries
}

export const useDataExportSelection = (assessmentSection: string): DataExportSelection => {
  const selection = useAppSelector((state) => DataExportSelectors.getSelection(state))
  if (!selection.sections[assessmentSection])
    return { ...selection, sections: { ...selection.sections, [assessmentSection]: { columns: [], variables: [] } } }
  return selection
}
