import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as GrowingStockState from '@webapp/app/assessment/fra/sections/growingStock/growingStockState'
import * as GrowingStockValidatorState from '@webapp/app/assessment/fra/sections/growingStock/growingStockValidatorState'

import {
  updateGrowingStockAvgCell,
  updateGrowingStockTotalCell,
} from '@webapp/app/assessment/fra/sections/growingStock/actions'

const section = FRA.sections['2'].children.a

const variables = {
  [GrowingStockState.variables.naturallyRegeneratingForest]: {
    totalValidator: GrowingStockValidatorState.totalForestValidator,
  },
  [GrowingStockState.variables.plantedForest]: {
    totalValidator: GrowingStockValidatorState.totalForestValidator,
  },
  [GrowingStockState.variables.plantationForest]: {
    subcategory: true,
    totalValidator: GrowingStockValidatorState.totalPlantedForestValidator,
  },
  [GrowingStockState.variables.otherPlantedForest]: {
    subcategory: true,
    totalValidator: GrowingStockValidatorState.totalPlantedForestValidator,
  },
  [GrowingStockState.variables.forest]: {},
  [GrowingStockState.variables.otherWoodedLand]: {},
}

const table1 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.name,
  [SectionSpec.KEYS_TABLE.odp]: true,
  [SectionSpec.KEYS_TABLE.odpVariables]: GrowingStockState.variables,
  [SectionSpec.KEYS_TABLE.getSectionData]: GrowingStockState.getTableDataAvg,
  [SectionSpec.KEYS_TABLE.updateTableDataCell]: updateGrowingStockAvgCell,
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
  [SectionSpec.KEYS_TABLE.odp]: true,
  [SectionSpec.KEYS_TABLE.odpVariables]: GrowingStockState.variables,
  [SectionSpec.KEYS_TABLE.getSectionData]: GrowingStockState.getTableDataTotal,
  [SectionSpec.KEYS_TABLE.updateTableDataCell]: updateGrowingStockTotalCell,
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
