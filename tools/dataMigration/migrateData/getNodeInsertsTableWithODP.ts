import { ITask } from 'pg-promise'

import { Assessment, NodeValue, Table } from '../../../meta/assessment'
import { NodeRow } from './_getNodeInserts'
import { Objects } from '../../../core/utils'
import { getCols, getRows } from './_repos'
import { DBNames } from '../_DBNames'

export const getNodeInsertsTableWithODP = async (
  props: {
    assessment: Assessment
    table: Table
    variables: Array<string>
    tableNameLegacy: string
    estimated?: boolean
  },
  client: ITask<any>
): Promise<Array<NodeRow>> => {
  const { assessment, table, variables, tableNameLegacy, estimated } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  const rows = await getRows(client, schema, table)
  const cols = await getCols(client, schema, table)

  const valuesLegacy = await client.map(
    `select *
     from _legacy.${tableNameLegacy}`,
    [],
    // @ts-ignore
    Objects.camelize
  )

  const values: Array<NodeRow> = []

  valuesLegacy.forEach((valueLegacy) => {
    variables.forEach((variable) => {
      const row = rows.find((row) => row.props.variableName === variable)
      const col = cols.find((col) => col.rowId === row.id && col.props.colName === String(valueLegacy.year))

      const value: NodeValue = { raw: valueLegacy[variable] ? String(valueLegacy[variable]) : undefined }
      if (estimated) value.estimated = valueLegacy[`${variable}Estimated`]

      values.push({
        country_iso: valueLegacy.countryIso,
        col_uuid: col.uuid,
        row_uuid: row.uuid,
        value,
      })
    })
  })

  return values
}
