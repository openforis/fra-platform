import { LinkRepository } from 'server/db/repository/assessmentCycle/links'

import { getActiveVerifyJob } from './getActiveVerifyJob'
import { getAllLinksToVisit } from './getAllLinksToVisit'
import { getManyExport } from './getManyExport'
import { update } from './update'
import { visitCycleLinks } from './visitCycleLinks'

export const Links = {
  getActiveVerifyJob,
  getAllLinksToVisit,
  getCount: LinkRepository.getCount,
  getMany: LinkRepository.getMany,
  getManyExport,
  update,
  verify: visitCycleLinks,
}
