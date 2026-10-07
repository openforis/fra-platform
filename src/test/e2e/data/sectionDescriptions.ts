import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { type DescriptionLocation } from 'test/e2e/api/descriptions'
import { SectionUtils } from 'test/e2e/utils/section'

const comments = { name: CommentableDescriptionName.generalComments } as const
const dataSources = { name: CommentableDescriptionName.dataSources } as const

// Each spec file has its own country and section, so files running in parallel never edit the same description
export const x12SpecificForestCategories: DescriptionLocation = {
  countryIso: 'X12',
  sectionName: 'specificForestCategories',
  ...comments,
}
export const x12ForestOwnership: DescriptionLocation = {
  countryIso: 'X12',
  sectionName: 'forestOwnership',
  ...comments,
}
export const x12BiomassStock: DescriptionLocation = { countryIso: 'X12', sectionName: 'biomassStock', ...dataSources }

export const x13SpecificForestCategories: DescriptionLocation = {
  countryIso: 'X13',
  sectionName: 'specificForestCategories',
  ...dataSources,
}
export const x13GrowingStock: DescriptionLocation = { countryIso: 'X13', sectionName: 'growingStock', ...dataSources }
export const x13BiomassStock: DescriptionLocation = { countryIso: 'X13', sectionName: 'biomassStock', ...dataSources }

export const x12SpecificForestCategoriesPath = SectionUtils.path(x12SpecificForestCategories)
export const x12ForestOwnershipPath = SectionUtils.path(x12ForestOwnership)
export const x12BiomassStockPath = SectionUtils.path(x12BiomassStock)
export const x13SpecificForestCategoriesPath = SectionUtils.path(x13SpecificForestCategories)
export const x13GrowingStockPath = SectionUtils.path(x13GrowingStock)
export const x13BiomassStockPath = SectionUtils.path(x13BiomassStock)
