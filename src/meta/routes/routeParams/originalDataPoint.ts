import { CountryIso } from 'meta/area/countryIso'
import { SectionRouteParams } from 'meta/routes/routeParams/section'

export type OriginalDataPointRouteParams = SectionRouteParams<CountryIso> & {
  year: string
}
