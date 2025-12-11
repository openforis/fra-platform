import { CycleRouteParams } from 'meta/routes/routeParams/cycle'
import { Cycle } from 'meta/routes/routes/_routes/cycle'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Invitation = createRoute<CycleRouteParams>({ path: 'invitation', parent: Cycle })
// export const InvitationAccept = createRoute<CycleRouteParams>({  path: ':invitationUuid',  parent: Invitation })
// export const InvitationLocal = createRoute<CycleRouteParams>({ path: 'local', parent: InvitationAccept })
