import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as ForestAreaWithinProtectedAreasValidatorState from '@webapp/sectionSpec/fra/forestAreaWithinProtectedAreas/forestAreaWithinProtectedAreasValidatorState'

const section = FRA.sections['3'].children.b

const rowsHeader = [
  RowSpecFactory.newHeaderInstance({
    cols: [
      ColSpecFactory.newHeaderInstance({
        labelKey: 'forestAreaWithinProtectedAreas.categoryHeader',
        rowSpan: 2,
        left: true,
      }),
      ColSpecFactory.newHeaderInstance({
        labelKey: 'forestAreaWithinProtectedAreas.areaUnitLabel',
        colSpan: FRA.years.length,
      }),
    ],
  }),
  RowSpecFactory.newHeaderInstance({
    cols: FRA.years.map((year: any) => ColSpecFactory.newHeaderInstance({ label: year })),
  }),
]

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.forestAreaWithinProtectedAreas,
  columnsExport: FRA.years,
  unit: Unit.haThousand,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['1'].children.a.name,
      tableName: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  rows: [
    ...rowsHeader,
    RowSpecFactory.newDataInstance({
      labelKey: 'forestAreaWithinProtectedAreas.header',
      variableExport: VARIABLES.forest_area_within_protected_areas,
      cols: FRA.years.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestAreaWithinProtectedAreasValidatorState.forestAreaValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan',
      variableExport: VARIABLES.forest_area_with_long_term_management_plan,
      cols: FRA.years.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestAreaWithinProtectedAreasValidatorState.forestAreaValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestAreaWithinProtectedAreas.ofWhichInProtectedAreas',
      variableExport: VARIABLES.of_which_in_protected_areas,
      cols: FRA.years.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestAreaWithinProtectedAreasValidatorState.protectedAreaValidator,
        })
      ),
      subcategory: true,
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: ForestAreaWithinProtectedAreasValidatorState.getValidationMessages,
    }),
  ],
})

const forestAreaWithinProtectedAreas = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default forestAreaWithinProtectedAreas
