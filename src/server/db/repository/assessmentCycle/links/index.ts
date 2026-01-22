import { getCount } from 'server/db/repository/assessmentCycle/links/getCount'
import { buildGetManyQuery, getMany } from 'server/db/repository/assessmentCycle/links/getMany'
import { getVerificationSummary } from 'server/db/repository/assessmentCycle/links/getVerificationSummary'
import { markDeletedMany } from 'server/db/repository/assessmentCycle/links/markDeletedMany'
import { update } from 'server/db/repository/assessmentCycle/links/update'
import { upsertMany } from 'server/db/repository/assessmentCycle/links/upsertMany'

export const LinkRepository = {
  buildGetManyQuery,
  getCount,
  getMany,
  getVerificationSummary,
  markDeletedMany,
  update,
  upsertMany,
}
