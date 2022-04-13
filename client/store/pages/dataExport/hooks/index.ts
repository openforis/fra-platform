import { Country, RegionCode } from '@meta/area'
import { Objects } from '@core/utils'

// import { useCountryIso, useAssessmentType, useCountries, useCountriesPanEuropean } from '@webapp/store/app'
import { useCountryIso } from '@client/hooks'
import { useCountries } from '@client/store/assessment'

// import { useHomeCountriesFilter } from '@webapp/store/page/home'

import { DataExportActions, DataExportSelection } from '@client/store/pages/dataExport'
import { useAppDispatch, useAppSelector } from '@client/store'

export const useDataExportCountries = (): Array<Country> => {
  const dispatch = useAppDispatch()
  // const assessmentType = useAssessmentType()
  const countries = useAppSelector((state) => state.pages?.dataExport?.countries)

  // if (assessmentType === AssessmentType.panEuropean) {
  //   return useCountriesPanEuropean()
  // }

  const countryIso = useCountryIso()
  const countriesAll = useCountries()
  // const countriesFilter = useHomeCountriesFilter()
  const isRegion = Object.values(RegionCode).includes(countryIso as RegionCode)

  // initialize data export countries
  if (Objects.isEmpty(countries)) {
    let countriesDataExport = countriesAll
    if (isRegion) {
      countriesDataExport = countriesAll.filter((country) => country.regionCodes.includes(countryIso as RegionCode))
    }
    // if (!Objects.isEmpty(countriesFilter)) {
    //   countriesDataExport = countriesAll.filter((country) => countriesFilter.includes(country.countryIso))
    // }

    dispatch(DataExportActions.updateCountries(countriesDataExport))
  }

  return countries
}

export const useDataExportSelection = (assessmentSection: string): DataExportSelection => {
  const selection = useAppSelector((state) => state.pages?.dataExport?.selection)
  if (!selection.sections[assessmentSection])
    return { ...selection, sections: { ...selection.sections, [assessmentSection]: { columns: [], variables: [] } } }
  return selection
}
