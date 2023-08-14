import { createRoute } from 'meta/routes/createRoute'
import { AssessmentRouteParams } from 'meta/routes/params'
import { Route } from 'meta/routes/route'

const Root: Route<undefined, undefined> = { path: '/', parts: [], generatePath: () => `/` }
const Assessment = createRoute<AssessmentRouteParams>({ path: 'assessments/:assessmentName', parent: Root })
const Cycle = createRoute<AssessmentRouteParams>({ path: ':cycleName', parent: Assessment })

export const Routes = {
  Root,

  Assessment,
  Cycle,
}
