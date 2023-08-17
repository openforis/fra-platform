import { createRoute } from './createRoute'
import { AssessmentRouteParams, CountryRouteParams, CycleRouteParams, SectionRouteParams } from './params'
import { Route } from './route'

const Root: Route<undefined, undefined> = { path: '/', parts: [], generatePath: () => `/` }
const Assessment = createRoute<AssessmentRouteParams>({ path: 'assessments/:assessmentName', parent: Root })
const Cycle = createRoute<CycleRouteParams>({ path: ':cycleName', parent: Assessment })
const Country = createRoute<CountryRouteParams>({ path: ':countryIso', parent: Cycle })
const CountryHome = createRoute<CountryRouteParams>({ path: 'home', parent: Country })
const Section = createRoute<SectionRouteParams>({ path: 'sections/:sectionName', parent: Country })

export const Routes = {
  Root,
  Assessment,
  Cycle,
  Country,
  CountryHome,
  Section,
}
