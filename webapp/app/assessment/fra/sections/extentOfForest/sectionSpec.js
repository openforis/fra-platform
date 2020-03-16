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
    null,
    'a',
    null,
    ExtentOfForestValidator.forestAreaValidator,
    false,
    'forestArea',
    null,
    { labelKey: 'fraClass.forest', color: '#0098a6' }
  ),
  SectionSpec.newRowData(
    'fraClass.otherWoodedLand',
    null,
    'a',
    null,
    ExtentOfForestValidator.otherWoodedLandValidator,
    false,
    'otherWoodedLand',
    null,
    { labelKey: 'fraClass.otherWoodedLand', color: '#bf00af' }
  ),

  SectionSpec.newRowData(
    'fraClass.otherLand',
    null,
    'c-a-b',
    null,
    ExtentOfForestValidator.areasNotExceedingTotalLandAreaValidator,
    false,
    'otherLand',
    ExtentOfForestState.getOtherLand
  ),
  SectionSpec.newRowData(
    'extentOfForest.totalLandArea',
    null,
    'c',
    null,
    null,
    false,
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

const tableSpec1 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.extentOfForest,
  [SectionSpec.KEYS_TABLE.rows]: rowsEOF,
  [SectionSpec.KEYS_TABLE.getSectionData]: ExtentOfForestState.getExtentOfForestData,
  [SectionSpec.KEYS_TABLE.isSectionDataEmpty]: ExtentOfForestState.isExtentOfForestEmpty,
  [SectionSpec.KEYS_TABLE.odp]: true,
  [SectionSpec.KEYS_TABLE.canGenerateValues]: ExtentOfForestState.hasOriginalDataPoints,
})

const tableSpec2 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.climaticDomain,
  [SectionSpec.KEYS_TABLE.rows]: rowsClimaticDomain,
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec1, tableSpec2],
})

const extentOfForest = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: ExtentOfForestState.useDescriptions,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: ExtentOfForestState.useDescriptions,
  },
})

export default extentOfForest
