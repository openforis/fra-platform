// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as GrowingStockState from './growingStockState'
import * as GrowingStockValidatorState from './growingStockValidatorState'

import * as GrowingStockActions from './actions'

const section = FRA.sections['2'].children.a

const variables = {
  [GrowingStockState.variables.naturallyRegeneratingForest]: {
    totalValidator: GrowingStockValidatorState.totalForestValidator,
    variableExport: SectionSpec.VARIABLES.naturally_regenerating_forest,
  },
  [GrowingStockState.variables.plantedForest]: {
    totalValidator: GrowingStockValidatorState.totalForestValidator,
    variableExport: SectionSpec.VARIABLES.planted_forest,
  },
  [GrowingStockState.variables.plantationForest]: {
    subcategory: true,
    totalValidator: GrowingStockValidatorState.totalPlantedForestValidator,
    variableExport: SectionSpec.VARIABLES.plantation_forest,
  },
  [GrowingStockState.variables.otherPlantedForest]: {
    subcategory: true,
    totalValidator: GrowingStockValidatorState.totalPlantedForestValidator,
    variableExport: SectionSpec.VARIABLES.other_planted_forest,
  },
  [GrowingStockState.variables.forest]: {
    variableExport: SectionSpec.VARIABLES.forest,
  },
  [GrowingStockState.variables.otherWoodedLand]: {
    variableExport: SectionSpec.VARIABLES.other_wooded_land,
  },
}

const table1 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.name,
  [SectionSpec.KEYS_TABLE.odp]: true,
  [SectionSpec.KEYS_TABLE.odpVariables]: GrowingStockState.variables,
  [SectionSpec.KEYS_TABLE.dataExport]: false,
  [SectionSpec.KEYS_TABLE.getSectionData]: GrowingStockState.getTableDataAvg,
  [SectionSpec.KEYS_TABLE.updateTableDataCell]: GrowingStockActions.updateGrowingStockAvgCell,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStock.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStock.avgTableHeader',
          [SectionSpec.KEYS_COL.colSpan]: null,
        }),
      ],
    }),
    ...Object.entries(variables).map(([variableName, variableProps]) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableName]: variableName,
        [SectionSpec.KEYS_ROW.labelKey]: `growingStock.${variableName}`,
        [SectionSpec.KEYS_ROW.subcategory]: !!variableProps.subcategory,
      })
    ),
  ],
})

const tableSection1 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.descriptionKey]: 'growingStock.supportText',
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [table1],
})

const table2 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.name,
  [SectionSpec.KEYS_TABLE.columnsExport]: FRA.years,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.millionsCubicMeterOverBark,
  [SectionSpec.KEYS_TABLE.odp]: true,
  [SectionSpec.KEYS_TABLE.odpVariables]: GrowingStockState.variables,
  [SectionSpec.KEYS_TABLE.getSectionData]: GrowingStockState.getTableDataTotal,
  [SectionSpec.KEYS_TABLE.updateTableDataCell]: GrowingStockActions.updateGrowingStockTotalCell,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStock.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStock.totalTableHeader',
          [SectionSpec.KEYS_COL.colSpan]: null,
        }),
      ],
    }),
    ...Object.entries(variables).map(([variableName, variableProps]) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableName]: variableName,
        [SectionSpec.KEYS_ROW.variableExport]: variableProps.variableExport,
        [SectionSpec.KEYS_ROW.labelKey]: `growingStock.${variableName}`,
        [SectionSpec.KEYS_ROW.subcategory]: !!variableProps.subcategory,
        [SectionSpec.KEYS_ROW.validator]: variableProps.totalValidator || null,
      })
    ),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: GrowingStockValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection2 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [table2],
})

const growingStock = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection1, tableSection2],
})

export default growingStock
