import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as HolderOfManagementRightsState from '@webapp/sectionSpec/fra/holderOfManagementRights/holderOfManagementRightsState'

const section = FRA.sections['4'].children.b
const { years } = HolderOfManagementRightsState

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.holderOfManagementRights,
  columnsExport: years,
  unit: Unit.haThousand,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['4'].children.a.name,
      tableName: FRA.sections['4'].children.a.tables.forestOwnership,
    },
  ],
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'holderOfManagementRights.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'holderOfManagementRights.areaUnitLabel',
          colSpan: years.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: years.map((year: any) =>
        ColSpecFactory.newHeaderInstance({
          label: year,
        })
      ),
    }),

    RowSpecFactory.newDataInstance({
      labelKey: 'holderOfManagementRights.publicAdministration',
      variableExport: VARIABLES.public_administration,
      variableNo: 'a',
      cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'holderOfManagementRights.individuals',
      variableExport: VARIABLES.individuals,
      variableNo: 'b',
      cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'holderOfManagementRights.privateBusinesses',
      variableExport: VARIABLES.private_businesses,
      variableNo: 'c',
      cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'holderOfManagementRights.communities',
      variableExport: VARIABLES.communities,
      variableNo: 'd',
      cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'holderOfManagementRights.other',
      variableExport: VARIABLES.other_or_unknown,
      variableNo: 'e',
      cols: years.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: HolderOfManagementRightsState.getOther,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'holderOfManagementRights.totalPublicOwnership',
      linkToSection: FRA.sections['4'].children.a.name,
      cols: years.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: HolderOfManagementRightsState.getTotalPublicOwnership,
        })
      ),
    }),
  ],
})

const holderOfManagementRights = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default holderOfManagementRights
