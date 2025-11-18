import { OriginalDataPointRouteParams } from 'meta/routes/routeParams/originalDataPoint'
import { Country } from 'meta/routes/routes/_routes/country'
import { createRoute } from 'meta/routes/routes/createRoute'

export const OriginalDataPoint = createRoute<OriginalDataPointRouteParams>({
  path: 'originalDataPoints/:year/:sectionName',
  parent: Country,
})
