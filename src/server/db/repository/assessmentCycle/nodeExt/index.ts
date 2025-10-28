import { getManyContacts } from 'server/db/repository/assessmentCycle/nodeExt/getManyContacts'
import { getManyDashboardItems } from 'server/db/repository/assessmentCycle/nodeExt/getManyDashboardItems'
import { removeContact } from 'server/db/repository/assessmentCycle/nodeExt/removeContact'
import { upsert } from 'server/db/repository/assessmentCycle/nodeExt/upsert'

export const NodeExtRepository = {
  getManyContacts,
  getManyDashboardItems,
  removeContact,
  upsert,
}
