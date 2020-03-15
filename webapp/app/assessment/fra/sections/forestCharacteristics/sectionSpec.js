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
  SectionSpec.newRowData('forestCharacteristics.naturalForestArea', [], 'a', null, null, 'naturalForestArea', null, {
    labelKey: 'forestCharacteristics.naturalForestArea',
    color: '#0098a6',
  }),
  SectionSpec.newRowData(
    'forestCharacteristics.plantedForest',
    [],
    'b',
    null,
    null,
    'plantedForest',
    ForestCharacteristicsState.getPlantedForest
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.plantationForestArea',
    [],
    null,
    null,
    null,
    'plantationForestArea',
    null,
    { labelKey: 'forestCharacteristics.plantationForestArea', color: '#bf00af' }
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.plantationForestIntroducedArea',
    [],
    null,
    null,
    ForestCharacteristicsValidatorState.plantationForestValidator,
    'plantationForestIntroducedArea',
    null
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.otherPlantedForestArea',
    [],
    null,
    null,
    null,
    'otherPlantedForestArea',
    null,
    { labelKey: 'forestCharacteristics.otherPlantedForestArea', color: '#f58833' }
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.total',
    [],
    'a+b',
    null,
    ForestCharacteristicsValidatorState.totalForestAreaNotEqualToExtentOfForestValidator,
    'total',
    ForestCharacteristicsState.getTotalForest
  ),
  SectionSpec.newRowData(
    'forestCharacteristics.totalForestArea',
    [],
    null,
    FRA.sections['1'].children.a.name,
    null,
    'totalForestArea',
    datum => state => ExtentOfForestState.getForestByYear(datum.name)(state)
  ),
  SectionSpec.newRowNoticeMessage(null, 2),
  SectionSpec.newRowValidationMessages(ForestCharacteristicsValidatorState.getValidationMessages),
]

const tableSpecs = [
  SectionSpec.newTableSpec(
    section.tables.forestCharacteristics,
    rows,
    ForestCharacteristicsState.getForestCharacteristicsData,
    ForestCharacteristicsState.isForestCharacteristicsDataEmpty,
    true,
    ForestCharacteristicsState.hasOriginalDataPoints
  ),
]
const tableSection = SectionSpec.newTableSection(tableSpecs)

const forestCharacteristics = SectionSpec.newSectionSpec(section.name, section.anchor, [tableSection], {
  nationalData: ForestCharacteristicsState.useDescriptions,
  analysisAndProcessing: ForestCharacteristicsState.useDescriptions,
})

export default forestCharacteristics
