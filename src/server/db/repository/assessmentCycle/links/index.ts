import { getCount } from 'server/db/repository/assessmentCycle/links/getCount'
import { buildGetManyQuery, getMany } from 'server/db/repository/assessmentCycle/links/getMany'
import { getVerificationSummary } from 'server/db/repository/assessmentCycle/links/getVerificationSummary'
import { markDeletedMany } from 'server/db/repository/assessmentCycle/links/markDeletedMany'
import { removeLocations } from 'server/db/repository/assessmentCycle/links/removeLocations'
import { update } from 'server/db/repository/assessmentCycle/links/update'
import { upsertLinks } from 'server/db/repository/assessmentCycle/links/upsertLinks'
import { upsertMany } from 'server/db/repository/assessmentCycle/links/upsertMany'

export const LinkRepository = {
  buildGetManyQuery,
  getCount,
  getMany,
  getVerificationSummary,
  markDeletedMany,
  removeLocations,
  update,
  upsertLinks,
  upsertMany,
}
