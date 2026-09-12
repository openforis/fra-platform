import { getMany } from 'server/cache/repository/section/getMany'
import { getManyMetadata } from 'server/cache/repository/section/getManyMetadata'
import { getSubSection } from 'server/cache/repository/section/getSubSection'
import { getSubSections } from 'server/cache/repository/section/getSubSections'
import { removeCycleEntries } from 'server/cache/repository/section/removeCycleEntries'
import { renameCycleEntries } from 'server/cache/repository/section/renameCycleEntries'

export const SectionRedisRepository = {
  getMany,
  getManyMetadata,
  getSubSection,
  getSubSections,
  removeCycleEntries,
  renameCycleEntries,
}
