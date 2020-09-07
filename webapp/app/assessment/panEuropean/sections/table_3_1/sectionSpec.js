import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['3'].children['31']

const variables = [
  'forest',
  '_of_which_forest_available_for_wood_supply',
]

const years = [...PanEuropean.years90_15].reverse();

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_3_1,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['gross_annual_increment'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['natural_losses'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['net_annual_increment'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['fellings_total'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['_of_which_of_natural_losses'],

  [SectionSpec.KEYS_TABLE.rows]: [
    // row header
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.incrementAndFellings.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.incrementAndFellings.gross_annual_increment',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.incrementAndFellings.natural_losses',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.incrementAndFellings.net_annual_increment',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.incrementAndFellings.fellings',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.incrementAndFellings.fellings_total',
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.incrementAndFellings._of_which_of_natural_losses',
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.incrementAndFellings.volume1000mob',
          [SectionSpec.KEYS_COL.colSpan]: 5,
        }),
      ],
    }),

    // rows data
    ...variables.flatMap((variable) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.incrementAndFellings.${variable}`,
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

const incrementAndFellings = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default incrementAndFellings
