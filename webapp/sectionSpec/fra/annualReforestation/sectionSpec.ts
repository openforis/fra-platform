import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as AnnualReforestationValidatorState from './annualReforestationValidatorState'

const section = FRA.sections['1'].children.e
const { yearsRange } = FRA

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.annualReforestation,
  columnsExport: yearsRange,
  unit: Unit.haThousandPerYear,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'annualReforestation.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'annualReforestation.areaUnitLabel',
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
      labelKey: `annualReforestation.reforestation`,
      variableExport: VARIABLES.reforestation,
      cols: yearsRange.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: AnnualReforestationValidatorState.positiveOrZeroValidator,
        })
      ),
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: AnnualReforestationValidatorState.getValidationMessages,
    }),
  ],
})

const forestAreaChange = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default forestAreaChange
