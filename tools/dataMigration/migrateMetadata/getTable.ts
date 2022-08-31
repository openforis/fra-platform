import { TableSpec } from '../../../.src.legacy/webapp/sectionSpec'
import { Assessment } from '../../../src/meta/assessment/assessment'
import { Table, TableColumnNames } from '../../../src/meta/assessment/table'
import { TableSection } from '../../../src/meta/assessment/tableSection'
import { TableMapping } from '../dataTable/tableMappings'

const fraYears = ['1990', '2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020']
const sustainableDevelopment15 = [...fraYears].splice(1)
// eslint-disable-next-line camelcase
const sustainableDevelopment15_2_1_1 = [
  '2000-2010',
  '2010-2015',
  '2015-2016',
  '2016-2017',
  '2017-2018',
  '2018-2019',
  '2019-2020',
]
const columnsMap: Record<string, Array<string>> = {
  extentOfForest: fraYears,
  climaticDomain: ['percentOfForestArea2015Default', 'percentOfForestArea2015'],
  forestCharacteristics: fraYears,
  growingStockAvg: fraYears,
  growingStockTotal: fraYears,
  degradedForest: ['answer'],
  sustainableDevelopment15_1_1: sustainableDevelopment15,
  // eslint-disable-next-line camelcase
  sustainableDevelopment15_2_1_1,
  sustainableDevelopment15_2_1_2: sustainableDevelopment15,
  sustainableDevelopment15_2_1_3: sustainableDevelopment15,
  sustainableDevelopment15_2_1_4: sustainableDevelopment15,
  sustainableDevelopment15_2_1_5: sustainableDevelopment15,
}

const getColumnNames = (assessment: Assessment, columnNames?: Array<string | number>): TableColumnNames =>
  columnNames
    ? assessment.cycles.reduce<TableColumnNames>(
        (acc, cycle) => ({ ...acc, [cycle.uuid]: columnNames.map((c) => String(c)) }),
        {}
      )
    : undefined

export const getTable = (props: {
  assessment: Assessment
  cycles: Array<string>
  tableSpec: TableSpec
  tableSection: TableSection
  mapping?: TableMapping
}): Table => {
  const { assessment, cycles, tableSpec, tableSection, mapping } = props
  const { name, dataExport, secondary, unit, columnsExport, columnsExportAlways } = tableSpec

  let columnNames = columnsMap[name]
  if (!columnNames && mapping) columnNames = mapping.columns.map((col) => col.name)
  const table: Table = {
    props: {
      cycles,
      name,
      columnNames: getColumnNames(assessment, columnNames),
      unit,
      odp: Boolean(tableSpec.odp),
      secondary,
      dataExport,
      columnsExport: getColumnNames(assessment, columnsExport),
      columnsExportAlways: getColumnNames(assessment, columnsExportAlways),
    },
    rows: [],
    tableSectionId: tableSection.id,
  }
  if (tableSpec.print?.pageBreakAfter) {
    table.props.print = { pageBreakAfter: tableSpec.print.pageBreakAfter }
  }
  return table
}
