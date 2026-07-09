import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'

import { SectionUtils } from '../utils/section'

export const x05ForestAreaChangePath = SectionUtils.path({
  countryIso: 'X05',
  sectionName: 'forestAreaChange',
})

export const x06ExtentOfForestPath = SectionUtils.path({
  countryIso: 'X06',
  sectionName: SectionNames.extentOfForest,
})

export const x07ExtentOfForestPath = SectionUtils.path({
  countryIso: 'X07',
  sectionName: SectionNames.extentOfForest,
})

export const x07ForestAreaChangePath = SectionUtils.path({
  countryIso: 'X07',
  sectionName: 'forestAreaChange',
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

export const x16ExtentOfForestPath = SectionUtils.path({
  countryIso: 'X16',
  sectionName: SectionNames.extentOfForest,
})

export const x16ForestAreaChangePath = SectionUtils.path({
  countryIso: 'X16',
  sectionName: 'forestAreaChange',
})

export const x14ExtentOfForestPath = SectionUtils.path({
  countryIso: 'X14',
  sectionName: SectionNames.extentOfForest,
})

export const x14PrintTablesPath = SectionUtils.printTablesPath('X14')

export const x16PrintTablesPath = SectionUtils.printTablesPath('X16')
