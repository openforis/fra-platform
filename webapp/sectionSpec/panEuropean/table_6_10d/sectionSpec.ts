import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { VARIABLES } from '@webapp/sectionSpec/variables'

const section = PanEuropean.sections['6'].children['610d']

const variables = [
  'no1_area_available_for_public_recreation',
  'no2_area_available_for_public_recreation',
  'no3_area_available_for_public_recreation',
  'no4_area_available_for_public_recreation',
  'no5_area_available_for_public_recreation',
  'no6_area_available_for_public_recreation',
  'no7_area_available_for_public_recreation',
  'no8_area_available_for_public_recreation',
  'no9_area_available_for_public_recreation',
  'no10_area_available_for_public_recreation',
  'no11_area_available_for_public_recreation',
  'no12_area_available_for_public_recreation',
  'no13_area_available_for_public_recreation',
  'no14_area_available_for_public_recreation',
  'no15_area_available_for_public_recreation',
  'no16_area_available_for_public_recreation',
  'no17_area_available_for_public_recreation',
  'no18_area_available_for_public_recreation',
  'no19_area_available_for_public_recreation',
  'no20_area_available_for_public_recreation',
]

const variablesMappings: Record<string, string> = {
  no1_area_available_for_public_recreation: VARIABLES.no1_area_available_for_public_recreation,
  no2_area_available_for_public_recreation: VARIABLES.no2_area_available_for_public_recreation,
  no3_area_available_for_public_recreation: VARIABLES.no3_area_available_for_public_recreation,
  no4_area_available_for_public_recreation: VARIABLES.no4_area_available_for_public_recreation,
  no5_area_available_for_public_recreation: VARIABLES.no5_area_available_for_public_recreation,
  no6_area_available_for_public_recreation: VARIABLES.no6_area_available_for_public_recreation,
  no7_area_available_for_public_recreation: VARIABLES.no7_area_available_for_public_recreation,
  no8_area_available_for_public_recreation: VARIABLES.no8_area_available_for_public_recreation,
  no9_area_available_for_public_recreation: VARIABLES.no9_area_available_for_public_recreation,
  no10_area_available_for_public_recreation: VARIABLES.no10_area_available_for_public_recreation,
  no11_area_available_for_public_recreation: VARIABLES.no11_area_available_for_public_recreation,
  no12_area_available_for_public_recreation: VARIABLES.no12_area_available_for_public_recreation,
  no13_area_available_for_public_recreation: VARIABLES.no13_area_available_for_public_recreation,
  no14_area_available_for_public_recreation: VARIABLES.no14_area_available_for_public_recreation,
  no15_area_available_for_public_recreation: VARIABLES.no15_area_available_for_public_recreation,
  no16_area_available_for_public_recreation: VARIABLES.no16_area_available_for_public_recreation,
  no17_area_available_for_public_recreation: VARIABLES.no17_area_available_for_public_recreation,
  no18_area_available_for_public_recreation: VARIABLES.no18_area_available_for_public_recreation,
  no19_area_available_for_public_recreation: VARIABLES.no19_area_available_for_public_recreation,
  no20_area_available_for_public_recreation: VARIABLES.no20_area_available_for_public_recreation,
}

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_10d,
  columnsExport: ['facility', 'measurement_unit', 'extent_multiplicity', 'facility_category'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.category',
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.facility',
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.measurement_unit',
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.extent_multiplicity',
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.facility_category',
          left: true,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.otherRecreationFacilitiesPilotReporting2015.${variable}`,
        cols: [
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newDecimalInstance({}),
          ColSpecFactory.newTextInstance({}),
        ],
      })
    ),
  ],
})

const otherRecreationFacilitiesPilotReporting2015 = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default otherRecreationFacilitiesPilotReporting2015
