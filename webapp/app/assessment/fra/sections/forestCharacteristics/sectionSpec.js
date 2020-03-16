import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import * as ForestCharacteristicsValidatorState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsValidatorState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const section = FRA.sections['1'].children.b

const rows = [
  SectionSpec.newRowHeader([
    SectionSpec.newColHeader('forestCharacteristics.areaUnitLabel', null, 2),
    SectionSpec.newColHeader('forestCharacteristics.categoryHeader', null, 1, null),
  ]),
  SectionSpec.newRowData(
    'forestCharacteristics.naturalForestArea',
    null,
    'a',
    null,
    null,
    false,
    'naturalForestArea',
    null,
    {
      labelKey: 'forestCharacteristics.naturalForestArea',
      color: '#0098a6',
    }
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.plantedForest',
    null,
    'b',
    null,
    null,
    false,
    'plantedForest',
    ForestCharacteristicsState.getPlantedForest
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.plantationForestArea',
    null,
    null,
    null,
    null,
    false,
    'plantationForestArea',
    null,
    { labelKey: 'forestCharacteristics.plantationForestArea', color: '#bf00af' }
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.plantationForestIntroducedArea',
    null,
    null,
    null,
    ForestCharacteristicsValidatorState.plantationForestValidator,
    true,
    'plantationForestIntroducedArea',
    null
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.otherPlantedForestArea',
    null,
    null,
    null,
    null,
    false,
    'otherPlantedForestArea',
    null,
    { labelKey: 'forestCharacteristics.otherPlantedForestArea', color: '#f58833' }
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.total',
    null,
    'a+b',
    null,
    ForestCharacteristicsValidatorState.totalForestAreaNotEqualToExtentOfForestValidator,
    false,
    'total',
    ForestCharacteristicsState.getTotalForest
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.totalForestArea',
    null,
    null,
    FRA.sections['1'].children.a.name,
    null,
    false,
    'totalForestArea',
    datum => state => ExtentOfForestState.getForestByYear(datum.name)(state)
  ),
  SectionSpec.newRowNoticeMessage(null, 2),
  SectionSpec.newRowValidationMessages(ForestCharacteristicsValidatorState.getValidationMessages),
]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestCharacteristics,
  [SectionSpec.KEYS_TABLE.rows]: rows,
  [SectionSpec.KEYS_TABLE.getSectionData]: ForestCharacteristicsState.getForestCharacteristicsData,
  [SectionSpec.KEYS_TABLE.isSectionDataEmpty]: ForestCharacteristicsState.isForestCharacteristicsDataEmpty,
  [SectionSpec.KEYS_TABLE.odp]: true,
  [SectionSpec.KEYS_TABLE.canGenerateValues]: ForestCharacteristicsState.hasOriginalDataPoints,
})

const tableSection = SectionSpec.newTableSection({ [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec] })

const forestCharacteristics = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: ForestCharacteristicsState.useDescriptions,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: ForestCharacteristicsState.useDescriptions,
  },
})

export default forestCharacteristics
