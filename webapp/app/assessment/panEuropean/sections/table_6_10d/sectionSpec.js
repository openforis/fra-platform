import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

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

const variablesMappings = {
  no1_area_available_for_public_recreation: SectionSpec.VARIABLES.no1_area_available_for_public_recreation,
  no2_area_available_for_public_recreation: SectionSpec.VARIABLES.no2_area_available_for_public_recreation,
  no3_area_available_for_public_recreation: SectionSpec.VARIABLES.no3_area_available_for_public_recreation,
  no4_area_available_for_public_recreation: SectionSpec.VARIABLES.no4_area_available_for_public_recreation,
  no5_area_available_for_public_recreation: SectionSpec.VARIABLES.no5_area_available_for_public_recreation,
  no6_area_available_for_public_recreation: SectionSpec.VARIABLES.no6_area_available_for_public_recreation,
  no7_area_available_for_public_recreation: SectionSpec.VARIABLES.no7_area_available_for_public_recreation,
  no8_area_available_for_public_recreation: SectionSpec.VARIABLES.no8_area_available_for_public_recreation,
  no9_area_available_for_public_recreation: SectionSpec.VARIABLES.no9_area_available_for_public_recreation,
  no10_area_available_for_public_recreation: SectionSpec.VARIABLES.no10_area_available_for_public_recreation,
  no11_area_available_for_public_recreation: SectionSpec.VARIABLES.no11_area_available_for_public_recreation,
  no12_area_available_for_public_recreation: SectionSpec.VARIABLES.no12_area_available_for_public_recreation,
  no13_area_available_for_public_recreation: SectionSpec.VARIABLES.no13_area_available_for_public_recreation,
  no14_area_available_for_public_recreation: SectionSpec.VARIABLES.no14_area_available_for_public_recreation,
  no15_area_available_for_public_recreation: SectionSpec.VARIABLES.no15_area_available_for_public_recreation,
  no16_area_available_for_public_recreation: SectionSpec.VARIABLES.no16_area_available_for_public_recreation,
  no17_area_available_for_public_recreation: SectionSpec.VARIABLES.no17_area_available_for_public_recreation,
  no18_area_available_for_public_recreation: SectionSpec.VARIABLES.no18_area_available_for_public_recreation,
  no19_area_available_for_public_recreation: SectionSpec.VARIABLES.no19_area_available_for_public_recreation,
  no20_area_available_for_public_recreation: SectionSpec.VARIABLES.no20_area_available_for_public_recreation,
}

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_10d,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['facility', 'measurement_unit', 'extent_multiplicity', 'facility_category'],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.category',
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.facility',
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.measurement_unit',
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.otherRecreationFacilitiesPilotReporting2015.extent_multiplicity',
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.facility_category',
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.otherRecreationFacilitiesPilotReporting2015.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          SectionSpec.newColDecimal(),
          SectionSpec.newColText(),
        ],
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const otherRecreationFacilitiesPilotReporting2015 = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default otherRecreationFacilitiesPilotReporting2015
