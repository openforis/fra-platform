import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'

import { type TableLocation } from 'test/e2e/api/table'
import { SectionUtils } from 'test/e2e/utils/section'

const extentOfForest = { sectionName: SectionNames.extentOfForest, tableName: TableNames.extentOfForest } as const
const forestAreaChange = { sectionName: 'forestAreaChange', tableName: TableNames.forestAreaChange } as const
const contactPersons = { sectionName: SectionNames.contactPersons, tableName: TableNames.contactPersons } as const

// Each spec file has its own country, so files running in parallel never edit the same table
export const x02ExtentOfForest: TableLocation = { countryIso: 'X02', ...extentOfForest }

export const x05ForestAreaChange: TableLocation = { countryIso: 'X05', ...forestAreaChange }

export const x06ExtentOfForest: TableLocation = { countryIso: 'X06', ...extentOfForest }

export const x07ExtentOfForest: TableLocation = { countryIso: 'X07', ...extentOfForest }
export const x07ForestAreaChange: TableLocation = { countryIso: 'X07', ...forestAreaChange }

export const x14ExtentOfForest: TableLocation = { countryIso: 'X14', ...extentOfForest }

export const x16ExtentOfForest: TableLocation = { countryIso: 'X16', ...extentOfForest }
export const x16ForestAreaChange: TableLocation = { countryIso: 'X16', ...forestAreaChange }

// Note: shouldSkipValidationFormula skips Atlantis countries - use ALB to test previous cycle validation
export const albExtentOfForest: TableLocation = { countryIso: 'ALB', ...extentOfForest }
export const albExtentOfForest2020: TableLocation = {
  countryIso: 'ALB',
  cycleName: CycleNames._2020,
  ...extentOfForest,
}

// Every Atlantis country is taken, and the submit to review spec changes AND's status, so no other spec should use it
export const andExtentOfForest: TableLocation = { countryIso: 'AND', ...extentOfForest }

export const x01ExtentOfForest: TableLocation = { countryIso: 'X01', ...extentOfForest }

// Publishing X01 in latest redirects users that aren't logged in away from its 2025 report, so 2025 uses X02
export const x02ContactPersons: TableLocation = { countryIso: 'X02', ...contactPersons }
export const x01ContactPersonsLatest: TableLocation = {
  countryIso: 'X01',
  cycleName: CycleNames.latest,
  ...contactPersons,
}

export const x02ExtentOfForestPath = SectionUtils.path(x02ExtentOfForest)
export const x05ForestAreaChangePath = SectionUtils.path(x05ForestAreaChange)
export const x06ExtentOfForestPath = SectionUtils.path(x06ExtentOfForest)
export const x07ExtentOfForestPath = SectionUtils.path(x07ExtentOfForest)
export const x07ForestAreaChangePath = SectionUtils.path(x07ForestAreaChange)
export const albSectionPath = SectionUtils.path(albExtentOfForest)
export const x16ExtentOfForestPath = SectionUtils.path(x16ExtentOfForest)
export const x16ForestAreaChangePath = SectionUtils.path(x16ForestAreaChange)
export const x14ExtentOfForestPath = SectionUtils.path(x14ExtentOfForest)
export const x14PrintTablesPath = SectionUtils.printTablesPath('X14')
export const x02ContactPersonsPath = SectionUtils.path(x02ContactPersons)
export const x01ContactPersonsLatestPath = SectionUtils.path(x01ContactPersonsLatest)
export const x01PrintTablesLatestPath = SectionUtils.printTablesPath('X01', CycleNames.latest)
export const andExtentOfForestPath = SectionUtils.path(andExtentOfForest)
