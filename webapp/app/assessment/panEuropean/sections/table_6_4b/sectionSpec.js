import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['1'].children['64b']

const variables = [
  'forestry_isic_nace_02',
]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_4b,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['fixed_capital_consumption'],

  [SectionSpec.KEYS_TABLE.rows]: [
    // row header
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.categoryYear',
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.fixed_capital_consumption',
        }),
      ],
    }),

    // rows data
    ...variables.flatMap((variable) =>
      PanEuropean.years90_15.reverse().map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColDecimal()],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const totalFixedCapitalConsumptionInForestsAndForestry = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default totalFixedCapitalConsumptionInForestsAndForestry
