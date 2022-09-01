import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['4'].children['49']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_9,
  unit: Unit.haThousand,
  columnsExport: ['mcpfe_class_1_1', 'mcpfe_class_1_2', 'mcpfe_class_1_3', 'mcpfe_class_2'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.protectedForests.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.protectedForests.mcpfe_class_1_1',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.protectedForests.mcpfe_class_1_2',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.protectedForests.mcpfe_class_1_3',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.protectedForests.mcpfe_class_2',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.protectedForests.ha1000',
          colSpan: 4,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.protectedForests.${variable}`,
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

const protectedForests = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default protectedForests
