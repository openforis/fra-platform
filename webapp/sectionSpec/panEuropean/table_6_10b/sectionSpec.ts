import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['6'].children['610b']

const variables = ['total_forest_and_other_wooded_land']

const years = [...PanEuropean.years05_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_10b,
  unit: Unit.annualNumberOfVisitsMillion,
  columnsExport: ['area_available_for_public_recreation', 'area_designated_and_or_managed_for_public_recreation'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.intensityOfUse.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.intensityOfUse.annualNumberOfVisitsMillion',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.intensityOfUse.areaAvailableForPublicRecreation',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.intensityOfUse.areaPrimarilyDesignatedAndOrManagedForPublicRecreation',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.intensityOfUse.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [ColSpecFactory.newDecimalInstance({}), ColSpecFactory.newDecimalInstance({})],
        })
      )
    ),
  ],
})

const intensityOfUse = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default intensityOfUse
