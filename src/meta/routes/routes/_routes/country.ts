// Country routes and sub routes
import { CountryHomeRouteParams, CountryRouteParams, CountryUserRouteParams } from 'meta/routes/routeParams/country'
import { Cycle } from 'meta/routes/routes/_routes/cycle'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Country = createRoute<CountryRouteParams>({ path: ':countryIso', parent: Cycle })
export const CountryDataDownload = createRoute<CountryRouteParams>({ path: 'data-download', parent: Country })
export const CountryHome = createRoute<CountryRouteParams>({ path: 'home', parent: Country })
export const CountryHomeSection = createRoute<CountryHomeRouteParams>({ path: ':sectionName', parent: CountryHome })
export const CountryHomeSectionInvite = createRoute<CountryHomeRouteParams>({
  path: 'invite',
  parent: CountryHomeSection,
})
export const CountryUser = createRoute<CountryUserRouteParams>({ path: 'users/:id', parent: Country })
