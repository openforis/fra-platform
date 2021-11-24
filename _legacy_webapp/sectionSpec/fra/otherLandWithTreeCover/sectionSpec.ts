import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

import * as OtherLandWithTreeCoverState from '../../../sectionSpec/fra/otherLandWithTreeCover/otherLandWithTreeCoverState'
import * as OtherLandWithTreeCoverValidatorState from '../../../sectionSpec/fra/otherLandWithTreeCover/otherLandWithTreeCoverValidatorState'

const section = FRA.sections['1'].children.f
const { yearsTable } = FRA

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.otherLandWithTreeCover,
  columnsExport: yearsTable,
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
          labelKey: 'otherLandWithTreeCover.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'otherLandWithTreeCover.areaUnitLabel',
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
      labelKey: 'otherLandWithTreeCover.palms',
      variableExport: VARIABLES.palms,
      variableNo: 'a',
      cols: yearsTable.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'otherLandWithTreeCover.treeorchards',
      variableExport: VARIABLES.tree_orchards,
      variableNo: 'b',
      cols: yearsTable.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'otherLandWithTreeCover.agroforestry',
      variableExport: VARIABLES.agroforestry,
      variableNo: 'c',
      cols: yearsTable.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'otherLandWithTreeCover.treesinurbansettings',
      variableExport: VARIABLES.trees_in_urban_settings,
      variableNo: 'd',
      cols: yearsTable.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'otherLandWithTreeCover.other',
      variableExport: VARIABLES.other,
      variableNo: 'e',
      cols: yearsTable.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'otherLandWithTreeCover.total',
      variableNo: 'a+b+c+d+e',
      mainCategory: true,
      cols: yearsTable.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: OtherLandWithTreeCoverState.getOtherLandWithTreeCoverTotal,
          validator: OtherLandWithTreeCoverValidatorState.otherLandWithTreeCoverTotalValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'otherLandWithTreeCover.otherLandArea',
      linkToSection: FRA.sections['1'].children.a.name,
      cols: yearsTable.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: OtherLandWithTreeCoverState.getOtherLand,
        })
      ),
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: OtherLandWithTreeCoverValidatorState.getValidationMessages,
    }),
  ],
})

const otherLandWithTreeCover = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default otherLandWithTreeCover
