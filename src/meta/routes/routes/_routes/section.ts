import { SectionRouteParams } from 'meta/routes/routeParams/section'
import { Country } from 'meta/routes/routes/_routes/country'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Section = createRoute<SectionRouteParams>({ path: 'sections/:sectionName', parent: Country })
