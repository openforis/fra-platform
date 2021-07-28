import { PanEuropean } from '@core/assessment'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['6'].children['610c']

const variables = ['area_available_for_public_recreation']

const years = [...PanEuropean.years15].reverse()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_10c,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.facilityLengthIn1000Km,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'forest_roads_and_paths_available_for_public_recreation',
    '_of_which_designated_for_hiking_biking_cross_country_skiing_etc',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.recreationFacilities.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.recreationFacilities.forestRoadsAndPathsAvailableForPublicRecreation',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.recreationFacilities._ofWhichDesignatedForHikingBikingCrossCountrySkiingEtc',
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.recreationFacilities.facilityLengthIn1000Km',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
      ],
    }),

    ...variables.flatMap((variable: any) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.recreationFacilities.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColDecimal(), SectionSpec.newColDecimal()],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const recreationFacilities = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default recreationFacilities
