import { CountryIso } from 'meta/area/countryIso'
import { Global } from 'meta/area/global'
import { RegionCode } from 'meta/area/regionCode'

export type Props = {
  enableDownload?: boolean
  includeCountries?: boolean
  includeRegions?: Array<string>
  onElementSelect?: (countryIso: CountryIso | Global | RegionCode) => void
  placeholder?: string
  selectedValue?: CountryIso | Global | RegionCode
  showCountryFlag?: boolean
  showCountryRole?: boolean
  disabled?: boolean
}
