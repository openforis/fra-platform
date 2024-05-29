import { LinkRepository } from 'server/repository/assessmentCycle/links'

import { getAllLinksToVisit } from './getAllLinksToVisit'
import { update } from './update'
import { visitCycleLinks, VisitCycleLinksQueueFactory } from './visitCycleLinks'

export const Links = {
  getActiveVerifyJobs: VisitCycleLinksQueueFactory.getActiveJobs,
  getAllLinksToVisit,
  getCount: LinkRepository.getCount,
  getMany: LinkRepository.getMany,
  update,
  verify: visitCycleLinks,
}
