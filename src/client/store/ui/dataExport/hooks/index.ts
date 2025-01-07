import { Objects } from 'utils/objects'

import { Areas, Country, RegionCode } from 'meta/area'
import { Cycles } from 'meta/assessment'
import { Users } from 'meta/user'

import { useAppDispatch, useAppSelector } from 'client/store'
import { useCountries } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { DataExportActions, DataExportSelection } from 'client/store/ui/dataExport'
import { useHomeCountriesFilter } from 'client/store/ui/home'
import { useUser, useUserCountries } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

export const useDataExportCountries = (): Array<Country> => {
  const dispatch = useAppDispatch()
  // const assessmentType = useAssessmentType()
  const countries = useAppSelector((state) => state.ui?.dataExport?.countries)

  // if (assessmentType === AssessmentType.panEuropean) {
  //   return useCountriesPanEuropean()
  // }

  const countryIso = useCountryIso()
  const countriesAll = useCountries()
  const countriesFilter = useHomeCountriesFilter()
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
  const selection = useAppSelector((state) => state.ui?.dataExport?.selection)
  if (!selection.sections[assessmentSection])
    return { ...selection, sections: { ...selection.sections, [assessmentSection]: { columns: [], variables: [] } } }
  return selection
}
