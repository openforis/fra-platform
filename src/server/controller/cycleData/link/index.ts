import { LinkRepository } from 'server/repository/assessmentCycle/link'

import { getAllLinksToVisit } from './getAllLinksToVisit'
import { update } from './update'
import { visitCycleLinks } from './visitCycleLinks'

export const Link = {
  getAllLinksToVisit,
  getCount: LinkRepository.getCount,
  getMany: LinkRepository.getMany,
  update,
  visitCycleLinks,
}
