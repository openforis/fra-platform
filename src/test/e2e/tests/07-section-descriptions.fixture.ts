import { SectionUtils } from '../utils/section'

const testSection = {
  countryIso: 'X01',
  sectionName: 'specificForestCategories',
} as const

export const sectionPath = SectionUtils.path(testSection)
