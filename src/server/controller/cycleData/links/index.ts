import { LinkRepository } from 'server/db/repository/assessmentCycle/links'

import { getActiveVerifyJobs } from './getActiveVerifyJobs'
import { getAllLinksToVisit } from './getAllLinksToVisit'
import { getManyExport } from './getManyExport'
import { update } from './update'
import { visitCycleLinks } from './visitCycleLinks'

export const Links = {
  getActiveVerifyJobs,
  getAllLinksToVisit,
  getCount: LinkRepository.getCount,
  getMany: LinkRepository.getMany,
  getManyExport,
  update,
  verify: visitCycleLinks,
}
