import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['2'].children['24']

const variables = [
  'forest',
  'other_wooded_land',
  'total_forest_and_other_wooded_land',
]

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_2_4,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['total_area_with_damage'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['insects_and_disease'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['wildlife_and_grazing'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['forest_operations'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['other'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['primarily_damaged_by_abiotic_agents'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['primarily_damaged_by_fire_total'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['of_which_human_induced'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['unspecified_mixed_damage'],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 4,
          [SectionSpec.KEYS_COL.left]: true,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.total_area_with_damage',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.areaWithDamageByDifferentAgents',
          [SectionSpec.KEYS_COL.colSpan]: 7,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.unspecified_mixed_damage',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.primarilyDamagedByBioticAgents',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.damagePrimarilyHumanInduced',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.primarily_damaged_by_abiotic_agents',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.primarilyDamagedByFire',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.insects_and_disease',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.wildlife_and_grazing',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.forest_operations',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.other',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.primarily_damaged_by_fire_total',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.of_which_human_induced',
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaWithDamage.thousandHa',
          [SectionSpec.KEYS_COL.colSpan]: 9,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.forestAreaWithDamage.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
          ],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const forestAreaWithDamage = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default forestAreaWithDamage
