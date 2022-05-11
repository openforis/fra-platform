import { Table } from '../../../meta/assessment/table'
import { TableSection } from '../../../meta/assessment/tableSection'
import { TableSpec } from '../../../webapp/sectionSpec'
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

export const getTable = (props: {
  cycles: Array<string>
  tableSpec: TableSpec
  tableSection: TableSection
  mapping?: TableMapping
}): Table => {
  const { cycles, tableSpec, tableSection, mapping } = props
  const { name, dataExport, secondary, unit, columnsExport, columnsExportAlways } = tableSpec

  let columnNames = columnsMap[name]
  if (!columnNames && mapping) columnNames = mapping.columns.map((col) => col.name)

  const table: Table = {
    props: {
      cycles,
      name,
      columnNames,
      unit,
      odp: Boolean(tableSpec.odp),
      secondary,
      dataExport,
      columnsExport,
      columnsExportAlways,
    },
    rows: [],
    tableSectionId: tableSection.id,
  }
  if (tableSpec.print?.pageBreakAfter) {
    table.props.print = { pageBreakAfter: tableSpec.print.pageBreakAfter }
  }
  return table
}
