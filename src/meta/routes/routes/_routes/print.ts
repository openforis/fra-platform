import { CountryRouteParams } from 'meta/routes/routeParams/country'
import { Country } from 'meta/routes/routes/_routes/country'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Print = createRoute<CountryRouteParams>({ path: 'print', parent: Country })
export const PrintTables = createRoute<CountryRouteParams>({ path: 'tables', parent: Print })
