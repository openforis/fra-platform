import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionTableSpec } from '../../../sectionSpec/sectionSpec'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

import * as GrowingStockState from './growingStockState'
import * as GrowingStockValidatorState from './growingStockValidatorState'

import * as GrowingStockActions from './actions'

const section = FRA.sections['2'].children.a

const variables = {
  [GrowingStockState.variables.naturallyRegeneratingForest]: {
    totalValidator: GrowingStockValidatorState.totalForestValidator,
    variableExport: VARIABLES.naturally_regenerating_forest,
  },
  [GrowingStockState.variables.plantedForest]: {
    totalValidator: GrowingStockValidatorState.totalForestValidator,
    variableExport: VARIABLES.planted_forest,
  },
  [GrowingStockState.variables.plantationForest]: {
    subcategory: true,
    totalValidator: GrowingStockValidatorState.totalPlantedForestValidator,
    variableExport: VARIABLES.plantation_forest,
  },
  [GrowingStockState.variables.otherPlantedForest]: {
    subcategory: true,
    totalValidator: GrowingStockValidatorState.totalPlantedForestValidator,
    variableExport: VARIABLES.other_planted_forest,
  },
  [GrowingStockState.variables.forest]: {
    variableExport: VARIABLES.forest,
  },
  [GrowingStockState.variables.otherWoodedLand]: {
    variableExport: VARIABLES.other_wooded_land,
  },
}

const table1 = TableSpecFactory.newInstance({
  name: section.name,
  odp: true,
  odpVariables: GrowingStockState.variables,
  dataExport: false,
  getSectionData: GrowingStockState.getTableDataAvg,
  updateTableDataCell: GrowingStockActions.updateGrowingStockAvgCell,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStock.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStock.avgTableHeader',
          colSpan: null,
        }),
      ],
    }),
    ...Object.entries(variables).map(([variableName, variableProps]) =>
      RowSpecFactory.newDataInstance({
        variableName,
        labelKey: `growingStock.${variableName}`,
        subcategory: !!variableProps.subcategory,
      })
    ),
  ],
})

const tableSection1: SectionTableSpec = {
  descriptionKey: 'growingStock.supportText',
  tableSpecs: [table1],
}

const table2 = TableSpecFactory.newInstance({
  name: section.name,
  columnsExport: FRA.years,
  unit: Unit.millionsCubicMeterOverBark,
  odp: true,
  odpVariables: GrowingStockState.variables,
  getSectionData: GrowingStockState.getTableDataTotal,
  updateTableDataCell: GrowingStockActions.updateGrowingStockTotalCell,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStock.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStock.totalTableHeader',
          colSpan: null,
        }),
      ],
    }),
    ...Object.entries(variables).map(([variableName, variableProps]) =>
      RowSpecFactory.newDataInstance({
        variableName,
        variableExport: variableProps.variableExport,
        labelKey: `growingStock.${variableName}`,
        subcategory: !!variableProps.subcategory,
        validator: variableProps.totalValidator || null,
      })
    ),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: GrowingStockValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection2: SectionTableSpec = {
  tableSpecs: [table2],
}

const growingStock = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [tableSection1, tableSection2],
})

export default growingStock
