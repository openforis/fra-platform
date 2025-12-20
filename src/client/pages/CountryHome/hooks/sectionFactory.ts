import { Route } from 'meta/routes/route'
import { CountryRouteParams } from 'meta/routes/routeParams/country'
import { CountryHome } from 'meta/routes/routes/_routes/country'
import { createRoute } from 'meta/routes/routes/createRoute'

export const RouteSectionFactory = (sectionName: string): Route => {
  return createRoute<CountryRouteParams>({ path: sectionName, parent: CountryHome })
}
