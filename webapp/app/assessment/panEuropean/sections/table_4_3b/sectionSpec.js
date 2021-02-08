import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['4'].children['43b']

const variables = ['forest']

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_4_3b,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.haThousand,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'naturally_established',
    'naturalised_introduced_species',
    'established_by_planting_and_or_seeding',
    'coppice',
    'unknown_origin',
    'native_species',
    'introduced_species',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.area1000ha',
          [SectionSpec.KEYS_COL.colSpan]: 7,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.semiNatural',
          [SectionSpec.KEYS_COL.colSpan]: 5,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.plantations',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.naturallyEstablished',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.naturalisedIntroducedSpecies',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.establishedByPlantingAndOrSeeding',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.coppiceSemiNatural',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.unknownOrigin',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.nativeSpecies',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.naturalnessBySubclasses.introducedSpecies',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.naturalnessBySubclasses.${variable}`,
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
          ],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const naturalnessBySubclasses = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default naturalnessBySubclasses
