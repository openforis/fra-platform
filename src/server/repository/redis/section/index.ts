import { getMany } from './getMany'
import { getManyMetadata } from './getManyMetadata'
import { getSubSection } from './getSubSection'
import { removeCycleEntries } from './removeCycleEntries'
import { renameCycleEntries } from './renameCycleEntries'

export const SectionRedisRepository = {
  getMany,
  getManyMetadata,
  getSubSection,
  removeCycleEntries,
  renameCycleEntries,
}
