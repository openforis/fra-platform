import { TableSection } from '../../core/meta/tableSection'
import { Table } from '../../core/meta/table'
import { TableSpec } from '../../webapp/sectionSpec'

export const getTable = (props: { cycles: Array<string>; tableSpec: TableSpec; tableSection: TableSection }): Table => {
  const { cycles, tableSpec, tableSection } = props

  const table: Table = {
    props: {
      cycles,
      name: tableSpec.name,
      unit: tableSpec.unit,
      odp: Boolean(tableSpec.odp),
    },
    rows: [],
    tableSectionId: tableSection.id,
  }
  return table
}
