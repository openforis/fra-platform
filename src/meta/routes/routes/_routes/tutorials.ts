import { CycleRouteParams } from 'meta/routes/routeParams/cycle'
import { Cycle } from 'meta/routes/routes/_routes/cycle'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Tutorials = createRoute<CycleRouteParams>({ path: 'tutorials', parent: Cycle })
