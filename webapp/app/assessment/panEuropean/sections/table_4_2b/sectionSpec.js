import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['4'].children['42b']

const variables = [
  'forest',
]

const years = [...PanEuropean.years90_15].reverse();

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_4_2b,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['afforestation'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['natural_expansion'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['natural_regeneration'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['planting_and_seeding'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['coppice'],

  [SectionSpec.KEYS_TABLE.rows]: [
    // row header
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.annualForestExpansionAndRegeneration1000ha',
          [SectionSpec.KEYS_COL.colSpan]: 5,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.expansionOfForestArea',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.regenerationOfForestArea',
          [SectionSpec.KEYS_COL.colSpan]: 3,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.afforestation',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.natural_expansion',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.natural_regeneration',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.planting_and_seeding',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.annualForestExpansionAndRegeneration.coppice',
        }),
      ],
    }),

    // rows data
    ...variables.flatMap((variable) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.annualForestExpansionAndRegeneration.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
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

const annualForestExpansionAndRegeneration = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default annualForestExpansionAndRegeneration
