import { CycleRouteParams } from 'meta/routes/routeParams/cycle'
import { Cycle } from 'meta/routes/routes/_routes/cycle'
import { createRoute } from 'meta/routes/routes/createRoute'
import { SectionNames } from 'meta/routes/sectionNames'

export const Admin = createRoute<CycleRouteParams>({ path: 'admin', parent: Cycle })
export const AdminCountries = createRoute<CycleRouteParams>({ path: 'countries', parent: Admin })
export const AdminInvitations = createRoute<CycleRouteParams>({ path: 'invitations', parent: Admin })
export const AdminLinks = createRoute<CycleRouteParams>({ path: 'links', parent: Admin })
export const AdminCollaborators = createRoute<CycleRouteParams>({
  path: SectionNames.Admin.collaborators,
  parent: Admin,
})
