import { SectionUtils } from 'test/e2e/utils/section'

const commentsSection = {
  countryIso: 'X12',
  sectionName: 'specificForestCategories',
} as const

const dataSourcesSection = {
  countryIso: 'X13',
  sectionName: 'specificForestCategories',
} as const

export const commentsSectionPath = SectionUtils.path(commentsSection)
export const dataSourcesSectionPath = SectionUtils.path(dataSourcesSection)
