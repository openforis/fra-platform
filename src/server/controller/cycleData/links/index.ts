import { LinkRepository } from 'server/repository/assessmentCycle/links'

import { getActiveVerifyJobs } from './getActiveVerifyJobs'
import { getAllLinksToVisit } from './getAllLinksToVisit'
import { update } from './update'
import { visitCycleLinks } from './visitCycleLinks'

export const Links = {
  getActiveVerifyJobs,
  getAllLinksToVisit,
  getCount: LinkRepository.getCount,
  getMany: LinkRepository.getMany,
  update,
  verify: visitCycleLinks,
}
