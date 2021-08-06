import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['6'].children['610c']

const variables = ['area_available_for_public_recreation']

const years = [...PanEuropean.years15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_10c,
  unit: Unit.facilityLengthIn1000Km,
  columnsExport: [
    'forest_roads_and_paths_available_for_public_recreation',
    '_of_which_designated_for_hiking_biking_cross_country_skiing_etc',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.recreationFacilities.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.recreationFacilities.forestRoadsAndPathsAvailableForPublicRecreation',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.recreationFacilities._ofWhichDesignatedForHikingBikingCrossCountrySkiingEtc',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.recreationFacilities.facilityLengthIn1000Km',
          colSpan: 2,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.recreationFacilities.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [ColSpecFactory.newDecimalInstance({}), ColSpecFactory.newDecimalInstance({})],
        })
      )
    ),
  ],
})

const recreationFacilities = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default recreationFacilities
