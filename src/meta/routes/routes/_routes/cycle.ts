import { CycleRouteParams } from 'meta/routes/routeParams/cycle'
import { Assessment } from 'meta/routes/routes/_routes/assessment'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Cycle = createRoute<CycleRouteParams>({ path: ':cycleName', parent: Assessment })
