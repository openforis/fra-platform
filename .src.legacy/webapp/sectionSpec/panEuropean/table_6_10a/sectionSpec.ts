import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'

const section = PanEuropean.sections['6'].children['610a']

const variables = ['total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_10a,
  columnsExport: [
    'area_available_for_public_recreation_total',
    'area_available_for_public_recreation_percent',
    'area_designated_or_managed_for_public_recreation_total',
    'area_designated_or_managed_for_public_recreation_percent',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.accessibilityForRecreation.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.accessibilityForRecreation.areaAvailableForPublicRecreation',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.accessibilityForRecreation.areaPrimarilyDesignatedOrManagedForPublicRecreation',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.accessibilityForRecreation.total1000Ha',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.accessibilityForRecreation._oftotal',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.accessibilityForRecreation.total1000Ha',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.accessibilityForRecreation._oftotal',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.accessibilityForRecreation.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
          ],
        })
      )
    ),
  ],
})

const accessibilityForRecreation = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default accessibilityForRecreation
