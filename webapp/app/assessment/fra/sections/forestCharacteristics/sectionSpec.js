import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import * as ForestCharacteristicsValidatorState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsValidatorState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

import { updateTableWithOdpCell } from '@webapp/app/assessment/components/dataTable/actions'

const section = FRA.sections['1'].children.b

const rows = [
  SectionSpec.newRowHeader({
    [SectionSpec.KEYS_ROW.cols]: [
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'forestCharacteristics.categoryHeader',
        [SectionSpec.KEYS_COL.rowSpan]: 2,
        [SectionSpec.KEYS_COL.left]: true,
      }),
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'forestCharacteristics.areaUnitLabel',
        [SectionSpec.KEYS_COL.colSpan]: null,
      }),
    ],
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'forestCharacteristics.naturalForestArea',
    [SectionSpec.KEYS_ROW.variableNo]: 'a',
    [SectionSpec.KEYS_ROW.variableName]: 'naturalForestArea',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.natural_forest_area,
    [SectionSpec.KEYS_ROW.chartProps]: {
      [SectionSpec.KEYS_ROW_CHART.labelKey]: 'forestCharacteristics.naturalForestArea',
      [SectionSpec.KEYS_ROW_CHART.color]: '#0098a6',
    },
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'forestCharacteristics.plantedForest',
    [SectionSpec.KEYS_ROW.variableNo]: 'b',
    [SectionSpec.KEYS_ROW.variableName]: 'plantedForest',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.planted_forest,
    [SectionSpec.KEYS_ROW.calculateFn]: ForestCharacteristicsState.getPlantedForest,
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'forestCharacteristics.plantationForestArea',
    [SectionSpec.KEYS_ROW.variableName]: 'plantationForestArea',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.plantation_forest_area,
    [SectionSpec.KEYS_ROW.chartProps]: {
      [SectionSpec.KEYS_ROW_CHART.labelKey]: 'forestCharacteristics.plantationForestArea',
      [SectionSpec.KEYS_ROW_CHART.color]: '#bf00af',
    },
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'forestCharacteristics.plantationForestIntroducedArea',
    [SectionSpec.KEYS_ROW.validator]: ForestCharacteristicsValidatorState.plantationForestValidator,
    [SectionSpec.KEYS_ROW.variableName]: 'plantationForestIntroducedArea',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.plantation_forest_introduced_area,
    [SectionSpec.KEYS_ROW.subcategory]: true,
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'forestCharacteristics.otherPlantedForestArea',
    [SectionSpec.KEYS_ROW.variableName]: 'otherPlantedForestArea',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.other_planted_forest_area,
    [SectionSpec.KEYS_ROW.chartProps]: {
      [SectionSpec.KEYS_ROW_CHART.labelKey]: 'forestCharacteristics.otherPlantedForestArea',
      [SectionSpec.KEYS_ROW_CHART.color]: '#f58833',
    },
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'forestCharacteristics.total',
    [SectionSpec.KEYS_ROW.variableNo]: 'a+b',
    [SectionSpec.KEYS_ROW.validator]:
      ForestCharacteristicsValidatorState.totalForestAreaNotEqualToExtentOfForestValidator,
    [SectionSpec.KEYS_ROW.variableName]: 'total',
    [SectionSpec.KEYS_ROW.calculateFn]: ForestCharacteristicsState.getTotalForest,
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'forestCharacteristics.totalForestArea',
    [SectionSpec.KEYS_ROW.linkToSection]: FRA.sections['1'].children.a.name,
    [SectionSpec.KEYS_ROW.variableName]: 'totalForestArea',
    [SectionSpec.KEYS_ROW.calculateFn]: (datum) => (state) => ExtentOfForestState.getForestByYear(datum.name)(state),
  }),
  SectionSpec.newRowNoticeMessage({
    [SectionSpec.KEYS_ROW.rowSpan]: 2,
  }),
  SectionSpec.newRowValidationMessages({
    [SectionSpec.KEYS_ROW.getValidationMessages]: ForestCharacteristicsValidatorState.getValidationMessages,
  }),
]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestCharacteristics,
  [SectionSpec.KEYS_TABLE.columnsExport]: FRA.years,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.haThousand,
  [SectionSpec.KEYS_TABLE.rows]: rows,
  [SectionSpec.KEYS_TABLE.getSectionData]: ForestCharacteristicsState.getForestCharacteristicsData,
  [SectionSpec.KEYS_TABLE.isSectionDataEmpty]: ForestCharacteristicsState.isForestCharacteristicsDataEmpty,
  [SectionSpec.KEYS_TABLE.odp]: true,
  [SectionSpec.KEYS_TABLE.odpVariables]: ForestCharacteristicsState.variables,
  [SectionSpec.KEYS_TABLE.showOdpChart]: true,
  [SectionSpec.KEYS_TABLE.canGenerateValues]: ForestCharacteristicsState.hasOriginalDataPoints,
  [SectionSpec.KEYS_TABLE.updateTableDataCell]: updateTableWithOdpCell,
  [SectionSpec.KEYS_TABLE.tableDataRequired]: [
    {
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
})

const tableSection = SectionSpec.newTableSection({ [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec] })

const forestCharacteristics = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_TABLE.columnsExport]: FRA.years,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: ForestCharacteristicsState.useDescriptions,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: ForestCharacteristicsState.useDescriptions,
  },
})

export default forestCharacteristics
