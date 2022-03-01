import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as ForestCharacteristicsState from '@webapp/sectionSpec/fra/forestCharacteristics/forestCharacteristicsState'
import * as ForestCharacteristicsValidatorState from '@webapp/sectionSpec/fra/forestCharacteristics/forestCharacteristicsValidatorState'
import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'

import { updateTableWithOdpCell } from '@webapp/components/Assessment/DataTable/actions'

const section = FRA.sections['1'].children.b

const rows = [
  RowSpecFactory.newHeaderInstance({
    cols: [
      ColSpecFactory.newHeaderInstance({
        labelKey: 'forestCharacteristics.categoryHeader',
        rowSpan: 2,
        left: true,
      }),
      ColSpecFactory.newHeaderInstance({
        labelKey: 'forestCharacteristics.areaUnitLabel',
        colSpan: null,
      }),
    ],
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'forestCharacteristics.naturalForestArea',
    variableNo: 'a',
    variableName: 'naturalForestArea',
    variableExport: VARIABLES.natural_forest_area,
    chartProps: {
      labelKey: 'forestCharacteristics.naturalForestArea',
      color: '#0098a6',
    },
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'forestCharacteristics.plantedForest',
    variableNo: 'b',
    variableName: 'plantedForest',
    variableExport: VARIABLES.planted_forest,
    calculateFn: ForestCharacteristicsState.getPlantedForest,
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'forestCharacteristics.plantationForestArea',
    variableName: 'plantationForestArea',
    variableExport: VARIABLES.plantation_forest_area,
    chartProps: {
      labelKey: 'forestCharacteristics.plantationForestArea',
      color: '#bf00af',
    },
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'forestCharacteristics.plantationForestIntroducedArea',
    validator: ForestCharacteristicsValidatorState.plantationForestValidator,
    variableName: 'plantationForestIntroducedArea',
    variableExport: VARIABLES.plantation_forest_introduced_area,
    subcategory: true,
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'forestCharacteristics.otherPlantedForestArea',
    variableName: 'otherPlantedForestArea',
    variableExport: VARIABLES.other_planted_forest_area,
    chartProps: {
      labelKey: 'forestCharacteristics.otherPlantedForestArea',
      color: '#f58833',
    },
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'forestCharacteristics.total',
    variableNo: 'a+b',
    validator: ForestCharacteristicsValidatorState.totalForestAreaNotEqualToExtentOfForestValidator,
    variableName: 'total',
    calculateFn: ForestCharacteristicsState.getTotalForest,
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'forestCharacteristics.totalForestArea',
    linkToSection: FRA.sections['1'].children.a.name,
    variableName: 'totalForestArea',
    calculateFn: (datum: any) => (state: any) => ExtentOfForestState.getForestByYear(datum.name || datum.year)(state),
  }),
  RowSpecFactory.newNoticeMessageInstance({
    rowSpan: 2,
  }),
  RowSpecFactory.newValidationMessagesInstance({
    getValidationMessages: ForestCharacteristicsValidatorState.getValidationMessages,
  }),
]

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.forestCharacteristics,
  columnsExport: FRA.years,
  unit: Unit.haThousand,
  rows,
  getSectionData: ForestCharacteristicsState.getForestCharacteristicsData,
  isSectionDataEmpty: ForestCharacteristicsState.isForestCharacteristicsDataEmpty,
  odp: true,
  odpVariables: ForestCharacteristicsState.variables,
  showOdpChart: true,
  canGenerateValues: ForestCharacteristicsState.hasOriginalDataPoints,
  updateTableDataCell: updateTableWithOdpCell,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['1'].children.a.name,
      tableName: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
})

const forestCharacteristics = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
  descriptions: {
    nationalData: ForestCharacteristicsState.useDescriptions,
    analysisAndProcessing: ForestCharacteristicsState.useDescriptions,
  },
})

export default forestCharacteristics
