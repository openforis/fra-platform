import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ExtentOfForestValidator from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const section = FRA.sections['1'].children.a

const rowsEOF = [
  SectionSpec.newRowHeader([
    SectionSpec.newColHeader('extentOfForest.categoryHeader', null, 2),
    SectionSpec.newColHeader('extentOfForest.areaUnitLabel', null, 1, null),
  ]),
  SectionSpec.newRowData(
    'extentOfForest.forestArea',
    [],
    'a',
    null,
    ExtentOfForestValidator.forestAreaValidator,
    'forestArea',
    null,
    { labelKey: 'fraClass.forest', color: '#0098a6' }
  ),
  SectionSpec.newRowData(
    'fraClass.otherWoodedLand',
    [],
    'a',
    null,
    ExtentOfForestValidator.otherWoodedLandValidator,
    'otherWoodedLand',
    null,
    { labelKey: 'fraClass.otherWoodedLand', color: '#bf00af' }
  ),

  SectionSpec.newRowData(
    'fraClass.otherLand',
    [],
    'c-a-b',
    null,
    ExtentOfForestValidator.areasNotExceedingTotalLandAreaValidator,
    'otherLand',
    ExtentOfForestState.getOtherLand
  ),
  SectionSpec.newRowData(
    'extentOfForest.totalLandArea',
    [],
    'c',
    null,
    null,
    'faoStat',
    ExtentOfForestState.getFaoStatArea
  ),

  SectionSpec.newRowNoticeMessage('extentOfForest.tableNoticeMessage', 2),

  SectionSpec.newRowValidationMessages(ExtentOfForestValidator.getValidationMessages),
]

const rowsClimaticDomain = [
  SectionSpec.newRowHeader([
    SectionSpec.newColHeader('climaticDomain.climaticDomain'),
    SectionSpec.newColHeader('climaticDomain.percentOfForestArea2015'),
    SectionSpec.newColHeader('climaticDomain.percentOfForestArea2015Override'),
  ]),
  ...ExtentOfForestState.rowsClimaticDomain.map(row =>
    SectionSpec.newRowData(`climaticDomain.${row}`, [
      SectionSpec.newColCalculated(ExtentOfForestState.getClimaticDomainConfigValue),
      SectionSpec.newColDecimal(),
    ])
  ),
]

const tableSpecs = [
  SectionSpec.newTableSpec(
    section.tables.extentOfForest,
    rowsEOF,
    ExtentOfForestState.getSectionData,
    ExtentOfForestState.isSectionDataEmpty,
    true
  ),
  SectionSpec.newTableSpec(section.tables.climaticDomain, rowsClimaticDomain),
]
const tableSection = SectionSpec.newTableSection(tableSpecs)

const extentOfForest = SectionSpec.newSectionSpec(section.name, section.anchor, [tableSection], {
  nationalData: ExtentOfForestState.useDescriptions,
  analysisAndProcessing: ExtentOfForestState.useDescriptions,
})

export default extentOfForest
