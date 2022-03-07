import { TableSection } from '../../../meta/assessment/tableSection'
import { Table } from '../../../meta/assessment/table'
import { TableSpec } from '../../../webapp/sectionSpec'

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
