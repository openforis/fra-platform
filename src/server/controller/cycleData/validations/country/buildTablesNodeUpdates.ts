import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordTables } from 'meta/assessment/table/record'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'
import { Objects } from 'utils/objects'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  tables: RecordTables
}

export const buildTablesNodeUpdates = (props: Props): NodeUpdates => {
  const { assessment, country, cycle, tables } = props

  const nodes = Object.entries(tables).reduce<Array<NodeUpdate>>((acc, [tableName, table]) => {
    table.rows?.forEach((row) => {
      const rowValidateFns = row.props.validateFns?.[cycle.uuid]
      const { variableName } = row.props

      row.cols?.forEach((col) => {
        const { colName } = col.props
        const validateFns = col.props.validateFns?.[cycle.uuid] ?? rowValidateFns

        if ([colName, variableName, validateFns].some(Objects.isEmpty)) return

        acc.push({
          colName,
          tableName,
          variableName,
        } as NodeUpdate) // NodeUpdate includes property 'value', which we don't need for queuing.
      })
    })

    return acc
  }, [])

  return {
    assessmentName: assessment.props.name,
    countryIso: country.countryIso,
    cycleName: cycle.name,
    nodes,
  }
}
