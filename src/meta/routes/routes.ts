import { createRoute } from './createRoute'
import { AssessmentRouteParams } from './params'
import { Route } from './route'

const Root: Route<undefined, undefined> = { path: '/', parts: [], generatePath: () => `/` }
const Assessment = createRoute<AssessmentRouteParams>({ path: 'assessments/:assessmentName', parent: Root })
const Cycle = createRoute<AssessmentRouteParams>({ path: ':cycleName', parent: Assessment })

export const Routes = {
  Root,

  Assessment,
  Cycle,
}
