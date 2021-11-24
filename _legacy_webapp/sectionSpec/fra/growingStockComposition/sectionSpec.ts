import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

import * as GrowingStockCompositionState from '../../../sectionSpec/fra/growingStockComposition/growingStockCompositionState'
import * as GrowingStockCompositionValidatorState from '../../../sectionSpec/fra/growingStockComposition/growingStockCompositionValidatorState'

const section = FRA.sections['2'].children.b
const years = FRA.yearsTable

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.growingStockComposition,
  columnsExport: years,
  columnsExportAlways: ['common_name', 'scientific_name'],
  unit: Unit.millionsCubicMeterOverBark,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['2'].children.a.name,
      tableName: FRA.sections['2'].children.a.name,
    },
  ],
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStockComposition.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStockComposition.scientificName',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStockComposition.commonName',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStockComposition.areaUnitLabel',
          colSpan: years.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: [
        ...years.map((year: any) =>
          ColSpecFactory.newHeaderInstance({
            label: year,
          })
        ),
      ],
    }),
    // Native tree species rows
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'growingStockComposition.nativeTreeSpecies',
          colSpan: years.length + 3,
          left: true,
        }),
      ],
    }),
    ...GrowingStockCompositionState.rowIndexes.native.map((idx) =>
      RowSpecFactory.newDataInstance({
        labelKey: 'growingStockComposition.rank',
        labelPrefixKey: 'growingStockComposition.native',
        variableExport: VARIABLES[`native_rank${idx + 1}`],
        labelParams: { idx: idx + 1 },
        cols: [
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newTextInstance({}),
          ...years.map(() => ColSpecFactory.newDecimalInstance({})),
        ],
      })
    ),
    RowSpecFactory.newDataInstance({
      labelKey: 'growingStockComposition.remainingNative',
      variableExport: VARIABLES.remaining_native,
      colSpan: 3,
      mainCategory: true,
      cols: years.map((_, idx) =>
        ColSpecFactory.newDecimalInstance({
          idx: idx + 2,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'growingStockComposition.totalNative',
      variableExport: VARIABLES.total_native,
      colSpan: 3,
      mainCategory: true,
      cols: years.map((_, idx) =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: GrowingStockCompositionState.getTotalNativeTreeSpecies,
          idx: idx + 2,
        })
      ),
    }),
    // Introduced tree species rows
    RowSpecFactory.newDataInstance({
      labelKey: 'growingStockComposition.introducedTreeSpecies',
      colSpan: years.length + 3,
      mainCategory: true,
    }),
    ...GrowingStockCompositionState.rowIndexes.introduced.map((_, idx) =>
      RowSpecFactory.newDataInstance({
        labelKey: 'growingStockComposition.rank',
        labelPrefixKey: 'growingStockComposition.introduced',
        variableExport: VARIABLES[`introduced_rank${idx + 1}`],
        labelParams: { idx: idx + 1 },
        cols: [
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newTextInstance({}),
          ...years.map(() => ColSpecFactory.newDecimalInstance({})),
        ],
      })
    ),
    RowSpecFactory.newDataInstance({
      labelKey: 'growingStockComposition.remainingIntroduced',
      variableExport: VARIABLES.remaining_introduced_placeholder,
      colSpan: 3,
      mainCategory: true,
      cols: years.map((_, idx: any) =>
        ColSpecFactory.newDecimalInstance({
          idx: idx + 2,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'growingStockComposition.totalIntroduced',
      variableExport: VARIABLES.total_remaining,

      colSpan: 3,
      mainCategory: true,
      cols: years.map((_, idx: any) =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: GrowingStockCompositionState.getTotalIntroducedTreeSpecies,
          idx: idx + 2,
        })
      ),
    }),
    // Total row
    RowSpecFactory.newDataInstance({
      labelKey: 'growingStockComposition.totalGrowingStock',
      colSpan: 3,
      mainCategory: true,
      cols: years.map((_, idx) =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: GrowingStockCompositionState.getTotalGrowingStock,
          idx: idx + 2,
          validator: GrowingStockCompositionValidatorState.totalGrowingStockValidator,
        })
      ),
    }),
    // Validation rows
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: GrowingStockCompositionValidatorState.getValidationMessages,
    }),
  ],
})

const growingStockComposition = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default growingStockComposition
