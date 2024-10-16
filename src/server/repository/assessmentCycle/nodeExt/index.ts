import { getManyContacts } from './getManyContacts'
import { getManyDashboardItems } from './getManyDashboardItems'
import { removeContact } from './removeContact'
import { upsert } from './upsert'

export const NodeExtRepository = {
  getManyContacts,
  getManyDashboardItems,
  removeContact,
  upsert,
}
