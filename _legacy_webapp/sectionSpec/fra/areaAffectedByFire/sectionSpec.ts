import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

import * as AreaAffectedByFireValidatorState from '../../../sectionSpec/fra/areaAffectedByFire/areaAffectedByFireValidatorState'

const section = FRA.sections['5'].children.b

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.areaAffectedByFire,
  columnsExport: FRA.yearsAnnual,
  unit: Unit.haThousand,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'areaAffectedByFire.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'areaAffectedByFire.areaUnitLabel',
          colSpan: FRA.yearsAnnual.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: FRA.yearsAnnual.map((year: any) =>
        ColSpecFactory.newHeaderInstance({
          label: year,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'areaAffectedByFire.totalLandAreaAffectedByFire',
      variableExport: VARIABLES.total_land_area_affected_by_fire,
      cols: FRA.yearsAnnual.map(() => ColSpecFactory.newDecimalInstance({})),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'areaAffectedByFire.ofWhichForest',
      variableExport: VARIABLES.of_which_on_forest,
      subcategory: true,
      cols: FRA.yearsAnnual.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator: AreaAffectedByFireValidatorState.totalForestLandAreaAreaValidator,
        })
      ),
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: AreaAffectedByFireValidatorState.getValidationMessages,
    }),
  ],
})

const areaAffectedByFire = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default areaAffectedByFire
