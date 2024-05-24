import { LinkRepository } from 'server/repository/assessmentCycle/link'

import { getAllLinksToVisit } from './getAllLinksToVisit'
import { update } from './update'
import { visitCycleLinks } from './visitCycleLinks'

export const Links = {
  getAllLinksToVisit,
  getCount: LinkRepository.getCount,
  getMany: LinkRepository.getMany,
  update,
  verify: visitCycleLinks,
}
