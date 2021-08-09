import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['6'].children['64a']

const variables = ['forestry_isic_nace_02']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_4a,
  unit: Unit.millionNationalCurrency,
  columnsExport: [
    'planting_of_trees_to_provide_regular_income',
    'equipment_and_buildings',
    'other_gross_fixed_capital_formation',
    'total',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.grossFixedCapitalFormationMillionNationalCurrency',
          colSpan: 4,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.plantingOfTreesToProvideRegularIncome',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.equipmentAndBuildings',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.otherGrossFixedCapitalFormation',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.total',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.${variable}`,
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

const totalGrossFixedCapitalFormationInForestsAndForestry = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default totalGrossFixedCapitalFormationInForestsAndForestry
