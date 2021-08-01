import { FRA } from '@core/assessment'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as GrowingStockCompositionState from '@webapp/app/assessment/fra/sections/growingStockComposition/growingStockCompositionState'
import * as GrowingStockCompositionValidatorState from '@webapp/app/assessment/fra/sections/growingStockComposition/growingStockCompositionValidatorState'

const section = FRA.sections['2'].children.b
const years = FRA.yearsTable

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.growingStockComposition,
  [SectionSpec.KEYS_TABLE.columnsExport]: years,
  [SectionSpec.KEYS_TABLE.columnsExportAlways]: ['common_name', 'scientific_name'],
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.Unit.millionsCubicMeterOverBark,
  [SectionSpec.KEYS_TABLE.tableDataRequired]: [
    {
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['2'].children.a.name,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['2'].children.a.name,
    },
  ],
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.scientificName',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.commonName',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        ...years.map((year: any) =>
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.label]: year,
          })
        ),
      ],
    }),
    // Native tree species rows
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.nativeTreeSpecies',
          [SectionSpec.KEYS_COL.colSpan]: years.length + 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),
    ...GrowingStockCompositionState.rowIndexes.native.map((idx) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.rank',
        [SectionSpec.KEYS_ROW.labelPrefixKey]: 'growingStockComposition.native',
        [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES[`native_rank${idx + 1}`],
        [SectionSpec.KEYS_ROW.labelParams]: { idx: idx + 1 },
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          ...years.map(() => SectionSpec.newColDecimal()),
        ],
      })
    ),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.remainingNative',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.remaining_native,
      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map((_, idx) =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.idx]: idx + 2,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.totalNative',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.total_native,
      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map((year: any, idx: any) =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: GrowingStockCompositionState.getTotalNativeTreeSpecies,
          [SectionSpec.KEYS_COL.idx]: idx + 2,
        })
      ),
    }),
    // Introduced tree species rows
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.introducedTreeSpecies',
      [SectionSpec.KEYS_ROW.colSpan]: years.length + 3,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
    }),
    ...GrowingStockCompositionState.rowIndexes.introduced.map((rowIdx: any, idx: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.rank',
        [SectionSpec.KEYS_ROW.labelPrefixKey]: 'growingStockComposition.introduced',
        [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES[`introduced_rank${idx + 1}`],
        [SectionSpec.KEYS_ROW.labelParams]: { idx: idx + 1 },
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          ...years.map(() => SectionSpec.newColDecimal()),
        ],
      })
    ),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.remainingIntroduced',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.remaining_introduced_placeholder,
      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map((year: any, idx: any) =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.idx]: idx + 2,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.totalIntroduced',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.total_remaining,

      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map((year: any, idx: any) =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: GrowingStockCompositionState.getTotalIntroducedTreeSpecies,
          [SectionSpec.KEYS_COL.idx]: idx + 2,
        })
      ),
    }),
    // Total row
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.totalGrowingStock',
      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map((year: any, idx: any) =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: GrowingStockCompositionState.getTotalGrowingStock,
          [SectionSpec.KEYS_COL.idx]: idx + 2,
          [SectionSpec.KEYS_COL.validator]: GrowingStockCompositionValidatorState.totalGrowingStockValidator,
        })
      ),
    }),
    // Validation rows
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: GrowingStockCompositionValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const growingStockComposition = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default growingStockComposition
