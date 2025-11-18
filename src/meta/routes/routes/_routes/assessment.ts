import { AssessmentRouteParams } from 'meta/routes/routeParams/assessment'
import { createRoute } from 'meta/routes/routes/createRoute'
import { Root } from 'meta/routes/routes/root'

export const Assessment = createRoute<AssessmentRouteParams>({ path: 'assessments/:assessmentName', parent: Root })
