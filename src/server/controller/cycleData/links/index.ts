import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { visitCycleLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/visitCycleLinks'

import { getActiveVerifyJob } from './getActiveVerifyJob'
import { getAllLinksToVisit } from './getAllLinksToVisit'
import { getManyExport } from './getManyExport'
import { update } from './update'

export const Links = {
  getActiveVerifyJob,
  getAllLinksToVisit,
  getCount: LinkRepository.getCount,
  getMany: LinkRepository.getMany,
  getManyExport,
  update,
  verify: visitCycleLinks,
}
