import { PanEuropean } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

const section = PanEuropean.sections['6'].children['67']
const variables = ['wood_consumption']
const variablesMappings: Record<string, string> = {
  woodConsumption: VARIABLES.wood_consumption,
}

const years = [...PanEuropean.years92_17]

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_7,
  unit: Unit.thousandCubicMeterRWE,
  columnsExport: years.map((year) => `_${year}`),
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.woodConsumption.category',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.woodConsumption.woodConsumption1000M3RWE',
          colSpan: years.length,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [...years].map((year) =>
        ColSpecFactory.newHeaderInstance({
          labelKey: `${year}`,
        })
      ),
    }),

    ...variables.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.woodConsumption.${variable}`,
        cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

const woodConsumption = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})
export default woodConsumption
