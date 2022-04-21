import { Table } from '../../../meta/assessment/table'
import { TableSection } from '../../../meta/assessment/tableSection'
import { TableSpec } from '../../../webapp/sectionSpec'

export const getTable = (props: { cycles: Array<string>; tableSpec: TableSpec; tableSection: TableSection }): Table => {
  const { cycles, tableSpec, tableSection } = props

  const table: Table = {
    props: {
      cycles,
      name: tableSpec.name,
      unit: tableSpec.unit,
      odp: Boolean(tableSpec.odp),
      dataExport: tableSpec.dataExport,
      secondary: tableSpec.secondary,
    },
    rows: [],
    tableSectionId: tableSection.id,
  }
  if (tableSpec.print?.pageBreakAfter) {
    table.props.print = { pageBreakAfter: tableSpec.print.pageBreakAfter }
  }
  return table
}
