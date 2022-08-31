import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['6'].children['64b']

const variables = ['forestry_isic_nace_02']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_4b,
  unit: Unit.millionNationalCurrency,
  columnsExport: ['fixed_capital_consumption'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.categoryYear',
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.fixedCapitalConsumptionMillionNationalCurrency',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [ColSpecFactory.newDecimalInstance({})],
        })
      )
    ),
  ],
})

const totalFixedCapitalConsumptionInForestsAndForestry = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default totalFixedCapitalConsumptionInForestsAndForestry
