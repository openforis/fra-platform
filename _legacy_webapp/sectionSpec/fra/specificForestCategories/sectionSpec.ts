import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

import * as SpecificForestCategoriesValidatorState from './specificForestCategoriesValidatorState'

const section = FRA.sections['1'].children.c
const { yearsTable } = FRA

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.specificForestCategories,
  unit: Unit.haThousand,
  columnsExport: yearsTable,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['1'].children.b.name,
      tableName: FRA.sections['1'].children.b.tables.forestCharacteristics,
    },
  ],
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'specificForestCategories.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'specificForestCategories.areaUnitLabel',
          colSpan: yearsTable.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: yearsTable.map((yearRange: any) =>
        ColSpecFactory.newHeaderInstance({
          label: yearRange,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `specificForestCategories.primaryForest`,
      variableExport: VARIABLES.primary_forest,
      cols: yearsTable.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: SpecificForestCategoriesValidatorState.primaryForestValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `specificForestCategories.temporarilyUnstocked`,
      variableExport: VARIABLES.temporarily_unstocked,
      cols: yearsTable.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `specificForestCategories.bamboo`,
      variableExport: VARIABLES.bamboo,
      cols: yearsTable.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: SpecificForestCategoriesValidatorState.forestAreaValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `specificForestCategories.mangroves`,
      variableExport: VARIABLES.mangroves,
      cols: yearsTable.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: SpecificForestCategoriesValidatorState.forestAreaValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `specificForestCategories.rubberWood`,
      variableExport: VARIABLES.rubber_wood,
      cols: yearsTable.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: SpecificForestCategoriesValidatorState.forestAreaValidator,
        })
      ),
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: SpecificForestCategoriesValidatorState.getValidationMessages,
    }),
  ],
})

const specificForestCategories = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default specificForestCategories
