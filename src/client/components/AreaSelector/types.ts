import { CountryIso, Global, RegionCode } from 'meta/area'

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
  userCountries?: boolean
}
