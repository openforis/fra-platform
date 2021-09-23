import { useDispatch, useSelector } from 'react-redux'

import { Country, RegionCode } from '@core/country'
import { AssessmentType } from '@core/assessment'
import { Objects } from '@core/utils'

import { useCountryIso } from '@webapp/hooks'
import { useAssessmentType, useCountries, useCountriesPanEuropean } from '@webapp/store/app'
import { useHomeCountriesFilter } from '@webapp/store/page/home'
import { DataExportSelection, DataExportState } from '@webapp/store/page/dataExport/state'
import { DataExportAction } from '@webapp/store/page/dataExport/actions'

// utility hook to get DataExportState
// TODO: remove it when adding types to redux store
const useState = (): DataExportState => useSelector((state: any) => state.page.dataExport)

export const useDataExportCountries = (): Array<Country> => {
  const dispatch = useDispatch()
  const assessmentType = useAssessmentType()

  if (assessmentType === AssessmentType.panEuropean) {
    return useCountriesPanEuropean()
  }

  const countryIso = useCountryIso()
  const countriesAll = useCountries()
  const countriesFilter = useHomeCountriesFilter()
  const state = useState()
  const isRegion = Object.values(RegionCode).includes(countryIso as RegionCode)

  // initialize data export countries
  if (Objects.isEmpty(state.countries)) {
    let countriesDataExport = countriesAll
    if (isRegion) {
      countriesDataExport = countriesAll.filter((country) => country.regionCodes.includes(countryIso as RegionCode))
    }
    if (!Objects.isEmpty(countriesFilter)) {
      countriesDataExport = countriesAll.filter((country) => countriesFilter.includes(country.countryIso))
    }

    dispatch(DataExportAction.updateCountries(countriesDataExport))
  }

  return state.countries
}

export const useDataExportSelection = (assessmentSection: string): DataExportSelection => {
  const state = useState()
  return state.selection[assessmentSection] ?? { columns: [], countryISOs: [], variable: '' }
}
