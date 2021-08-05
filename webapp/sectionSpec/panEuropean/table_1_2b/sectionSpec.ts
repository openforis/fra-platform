import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

const section = PanEuropean.sections['1'].children['12b']

const variables = ['predominantly_coniferous_forest', 'predominantly_broadleaved_forest', 'mixed_forest']

const variablesMappings: Record<string, string> = {
  predominantly_coniferous_forest: VARIABLES.predominantly_coniferous_forest,
  predominantly_broadleaved_forest: VARIABLES.predominantly_broadleaved_forest,
  mixed_forest: VARIABLES.mixed_forest,
}

const years = [...PanEuropean.years90_20]

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_1_2b,
  unit: Unit.millionsCubicMeterOverBark,
  columnsExport: [
    'growing_stock_1990',
    'growing_stock_2000',
    'growing_stock_2005',
    'growing_stock_2010',
    'growing_stock_2015',
    'growing_stock_2020',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStockByForestType.category',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStockByForestType.growingStockMillionM3OB',
          colSpan: years.length,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: years.map((year) =>
        ColSpecFactory.newHeaderInstance({
          labelKey: `${year}`,
        })
      ),
    }),

    ...variables.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.growingStockByForestType.${variable}`,
        cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

const growingStockByForestType = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default growingStockByForestType
