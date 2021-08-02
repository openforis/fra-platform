import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'
import * as ForestOwnershipState from '@webapp/sectionSpec/fra/forestOwnership/forestOwnershipState'
import * as ForestOwnershipValidatorState from '@webapp/sectionSpec/fra/forestOwnership/forestOwnershipValidatorState'

const section = FRA.sections['4'].children.a
const { years } = ForestOwnershipState

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.forestOwnership,
  columnsExport: years,
  unit: Unit.haThousand,
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
          labelKey: 'forestOwnership.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'forestOwnership.areaUnitLabel',
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
      labelKey: 'forestOwnership.privateOwnership',
      variableExport: VARIABLES.private_ownership,
      variableNo: 'a',
      cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestOwnership.ofWhichIndividuals',
      variableExport: VARIABLES.of_which_by_individuals,
      subcategory: true,
      cols: years.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestOwnership.ofWhichPrivateBusinesses',
      variableExport: VARIABLES.of_which_by_private_businesses,
      subcategory: true,
      cols: years.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestOwnership.ofWhichCommunities',
      variableExport: VARIABLES.of_which_by_communities,
      subcategory: true,
      cols: years.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestOwnership.publicOwnership',
      variableExport: VARIABLES.public_ownership,
      variableNo: 'b',
      cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestOwnership.otherOrUnknown',
      variableExport: VARIABLES.other_or_unknown,
      variableNo: 'c',
      cols: years.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: ForestOwnershipState.getOtherOrUnknown,
          validator: ForestOwnershipValidatorState.otherOrUnknownValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'forestOwnership.totalForestArea',
      linkToSection: FRA.sections['1'].children.a.name,
      cols: years.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: (colIdx: any) => ExtentOfForestState.getForestByYearFraIdx(colIdx),
        })
      ),
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: ForestOwnershipValidatorState.getValidationMessages,
    }),
  ],
})

const forestOwnership = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default forestOwnership
