import { CountryRouteParams } from 'meta/routes/routeParams/country'
import { Country } from 'meta/routes/routes/_routes/country'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Geo = createRoute<CountryRouteParams>({ path: 'geo', parent: Country })
