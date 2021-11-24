import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

import * as ForestAreaChangeState from '../../../sectionSpec/fra/forestAreaChange/forestAreaChangeState'
import * as ForestAreaChangeValidatorState from '../../../sectionSpec/fra/forestAreaChange/forestAreaChangeValidatorState'

import * as ForestAreaChangeActions from './actions'

const section = FRA.sections['1'].children.d
const { yearsRange } = FRA

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.forestAreaChange,
  columnsExport: yearsRange,
  unit: Unit.haThousandPerYear,
  updateTableDataCell: ForestAreaChangeActions.updateForestAreaChangeCell,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['1'].children.a.name,
      tableName: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'forestAreaChange.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'forestAreaChange.areaUnitLabel',
          colSpan: yearsRange.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: yearsRange.map((yearRange: any) =>
        ColSpecFactory.newHeaderInstance({
          label: yearRange,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `forestAreaChange.forestExpansion`,
      variableExport: VARIABLES.forest_expansion,
      variableNo: 'a',
      cols: yearsRange.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestAreaChangeValidatorState.positiveOrZeroValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `forestAreaChange.ofWhichAfforestation`,
      variableExport: VARIABLES.afforestation,
      subcategory: true,
      cols: yearsRange.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestAreaChangeValidatorState.forestExpansionValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `forestAreaChange.ofWhichNaturalExpansion`,
      variableExport: VARIABLES.natural_expansion,
      subcategory: true,
      cols: yearsRange.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestAreaChangeValidatorState.forestExpansionValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `forestAreaChange.deforestation`,
      variableExport: VARIABLES.deforestation,
      variableNo: 'b',
      cols: yearsRange.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestAreaChangeValidatorState.positiveOrZeroValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestAreaChange.forestAreaNetChange',
      variableNo: 'a-b',
      linkToSection: FRA.sections['1'].children.a.name,
      cols: yearsRange.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: ForestAreaChangeState.getExtentOfForestChange,
        })
      ),
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: ForestAreaChangeValidatorState.getValidationMessages,
    }),
  ],
})

const forestAreaChange = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default forestAreaChange
