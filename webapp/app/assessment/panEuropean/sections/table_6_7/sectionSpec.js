import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['6'].children['67']

const variables = [
  'wood_consumption',
]

const variablesMappings = {
  woodConsumption: SectionSpec.VARIABLES.wood_consumption,
}

const years = [...PanEuropean.years92_17]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_7,
  [SectionSpec.KEYS_TABLE.columnsExport]: '_1992',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_1993',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_1994',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_1995',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_1996',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_1997',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_1998',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_1999',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2000',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2001',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2002',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2003',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2004',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2005',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2006',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2007',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2008',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2009',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2010',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2011',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2012',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2013',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2014',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2015',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2016',
  [SectionSpec.KEYS_TABLE.columnsExport]: '_2017',

  [SectionSpec.KEYS_TABLE.rows]: [
    // row header
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.woodConsumption.category',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1992,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1993,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1994,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1995,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1996,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1997,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1998,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1999,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2000,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2001,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2002,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2003,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2004,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2005,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2006,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2007,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2008,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2009,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2010,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2011,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2012,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2013,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2014,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2015,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2016,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2017,
        }),
      ]
    }),
 

    // rows data
    ...variables.flatMap((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.woodConsumption.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const woodConsumption = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default woodConsumption
