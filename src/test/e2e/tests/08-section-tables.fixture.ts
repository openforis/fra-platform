import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'

import { SectionUtils } from '../utils/section'

export const sectionPath = SectionUtils.path({
  countryIso: 'X01',
  sectionName: SectionNames.extentOfForest,
})

// Note: shouldSkipValidationFormula skips Atlantis countries - use ALB to test previous cycle validation
export const albSectionPath = SectionUtils.path({
  countryIso: 'ALB',
  sectionName: SectionNames.extentOfForest,
})

export const albSection2020Path = SectionUtils.path({
  countryIso: 'ALB',
  cycleName: CycleNames._2020,
  sectionName: SectionNames.extentOfForest,
})

export const x01ForestAreaChangePath = SectionUtils.path({
  countryIso: 'X01',
  sectionName: 'forestAreaChange',
})

export const x16ExtentOfForestPath = SectionUtils.path({
  countryIso: 'X16',
  sectionName: SectionNames.extentOfForest,
})

export const x16ForestAreaChangePath = SectionUtils.path({
  countryIso: 'X16',
  sectionName: 'forestAreaChange',
})
