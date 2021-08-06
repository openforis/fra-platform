import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['6'].children['63']

const variables = ['forestry']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_3,
  unit: Unit.millionNationalCurrency,
  columnsExport: ['factor_income', 'net_operating_surplus'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.factorIncomeAndEntrepreneurialIncome.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.factorIncomeAndEntrepreneurialIncome.factor_income',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.factorIncomeAndEntrepreneurialIncome.net_operating_surplus',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.factorIncomeAndEntrepreneurialIncome.millionNationalCurrency',
          colSpan: 2,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.factorIncomeAndEntrepreneurialIncome.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [ColSpecFactory.newDecimalInstance({}), ColSpecFactory.newDecimalInstance({})],
        })
      )
    ),
  ],
})

const factorIncomeAndEntrepreneurialIncome = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default factorIncomeAndEntrepreneurialIncome
