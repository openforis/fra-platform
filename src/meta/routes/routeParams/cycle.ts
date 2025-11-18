import { CycleName } from 'meta/assessment/cycle'
import { AssessmentRouteParams } from 'meta/routes/routeParams/assessment'

export type CycleRouteParams = AssessmentRouteParams & {
  cycleName: CycleName
}
