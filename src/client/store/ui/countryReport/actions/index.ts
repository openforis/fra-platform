import { setGlobalCountries } from 'client/store/ui/countryReport/actions/setGlobalCountries'
import { toggleDataLock } from 'client/store/ui/countryReport/actions/toggleDataLock'
import { toggleEditDescription } from 'client/store/ui/countryReport/actions/toggleEditDescription'
import { toggleShowOriginalDataPoint } from 'client/store/ui/countryReport/actions/toggleShowOriginalDataPoint'

export const CountryReportActions = {
  setGlobalCountries,
  toggleDataLock,
  toggleEditDescription,
  toggleShowOriginalDataPoint,
}
