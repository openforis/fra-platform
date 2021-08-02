import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['5'].children['51']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_5_1,
  unit: Unit.haThousand,
  columnsExport: [
    'soil_water_and_other_forest_ecosystem_functions',
    'infrastructure_and_managed_natural_resources',
    'total',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.protectiveForestsMCPFEClass31000ha',
          colSpan: 3,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.soil_water_and_other_forest_ecosystem_functions',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.infrastructure_and_managed_natural_resources',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
          ],
        })
      )
    ),
  ],
})

const protectiveForestsSoilWaterAndOtherEcosystemFunctions = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default protectiveForestsSoilWaterAndOtherEcosystemFunctions
