import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment, AssessmentName, Row, Table } from '@meta/assessment'

/**
 * Helper function to get rows for tableId
 * Private function only used here to populate table(s)
 * @param props
 * @param props.tableId table.id
 * @param props.assessment
 * @param client
 */
const _getManyRows = async (
  props: { tableId: number; assessment: Assessment },
  client: BaseProtocol = DB
): Promise<Array<Row>> => {
  const { tableId, assessment } = props

  return client.tx(async (t) => {
    const rows = await AssessmentRepository.getManyRows({ assessment, tableId }, t)
    return Promise.all(
      rows.map(async (row: Row) => {
        return {
          ...row,
          cols: await AssessmentRepository.getManyCols({ assessment, rowId: row.id }),
        }
      })
    )
  })
}

/**
 * Populate given table with rows
 * row.tableId = table.id
 * @param table
 * @param assessment
 */
const _populateWithRows = async (table: Table, assessment: Assessment): Promise<Table> => ({
  ...table,
  rows: await _getManyRows({ assessment, tableId: table.id }),
})

export const getTablesMetadata = async (
  props: { assessmentName: AssessmentName; section: string },
  client: BaseProtocol = DB
): Promise<Array<Table>> => {
  const { assessmentName, section } = props

  return client.tx(async (t) => {
    const assessment = await AssessmentRepository.read({ name: assessmentName }, t)
    const tables = await AssessmentRepository.readTablesMetadata(
      {
        assessment,
        section,
      },
      t
    )

    return Promise.all(tables.map((table) => _populateWithRows(table, assessment)))
  })
}
