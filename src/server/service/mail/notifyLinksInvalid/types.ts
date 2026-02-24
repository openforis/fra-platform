import { CountryIso } from 'meta/area/countryIso'
import { Link } from 'meta/cycleData/links/link'

export type LinksByCountry = { [key in CountryIso]?: Array<Link> }
