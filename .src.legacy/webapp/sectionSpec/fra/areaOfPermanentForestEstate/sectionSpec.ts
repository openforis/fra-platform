import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as AreaOfPermanentForestEstateValidatorState from '@webapp/sectionSpec/fra/areaOfPermanentForestEstate/areaOfPermanentForestEstateValidatorState'

const section = FRA.sections['6'].children.b
const { yearsTable } = FRA

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.areaOfPermanentForestEstate,
  unit: Unit.haThousand,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['1'].children.a.name,
      tableName: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  columnsExport: yearsTable,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'areaOfPermanentForestEstate.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'areaOfPermanentForestEstate.areaUnitLabel',
          colSpan: yearsTable.length + 1,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'areaOfPermanentForestEstate.applicable',
        }),
        ...yearsTable.map((year) =>
          ColSpecFactory.newHeaderInstance({
            label: `${year}`,
          })
        ),
      ],
    }),

    RowSpecFactory.newDataInstance({
      labelKey: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate',
      variableExport: VARIABLES.area_of_permanent_forest_estate,
      cols: [
        ColSpecFactory.newSelectYesNoInstance({}),
        ...yearsTable.map(() =>
          ColSpecFactory.newDecimalInstance({
            validator: AreaOfPermanentForestEstateValidatorState.areaOfPermanentEstateValidator,
          })
        ),
      ],
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: AreaOfPermanentForestEstateValidatorState.getValidationMessages,
    }),
  ],
})

const areaOfPermanentForestEstate = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
  descriptions: {
    analysisAndProcessing: false,
  },
})

export default areaOfPermanentForestEstate
