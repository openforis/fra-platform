import { Assessment } from '../../../meta/assessment/assessment'
import { Table } from '../../../meta/assessment/table'
import { Row, RowType } from '../../../meta/assessment/row'
import { Col, ColType } from '../../../meta/assessment/col'

import { BaseProtocol } from '../../../server/db'
import { Objects } from '../../../core/utils/objects'
import { DBNames } from '../_DBNames'

const years = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

const calculateFNs: Record<string, Record<string, string>> = {
  extentOfForest: {
    otherLand: 'extentOfForest.forestArea - extentOfForest.otherWoodedLand',
  },
  forestCharacteristics: {
    totalForestArea:
      'forestCharacteristics.naturalForestArea + forestCharacteristics.plantationForestArea + forestCharacteristics.otherPlantedForestArea',
    forestArea: 'extentOfForest.forestArea',
  },
}

export const migrateTableWithODP = async (
  props: { assessment: Assessment; tableName: string; variables: Array<string> },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, tableName, variables } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)

  const table = await client.one<Table>(
    `
        select t.*
        from ${schema}."table" t
        where t.props ->> 'name' = $1
    `,
    [tableName],
    Objects.camelize
  )

  const cycles = assessment.cycles.map((cycle) => cycle.uuid)

  // insert row header
  let rowHeader: Row = {
    props: { cycles, type: RowType.header, index: 'header_1' },
    tableId: table.id,
  }
  rowHeader = await client.one<Row>(
    `
        insert into ${schema}.row (props, table_id)
        values ($1, $2)
        returning *;
    `,
    [JSON.stringify(rowHeader.props), table.id],
    Objects.camelize
  )
  // insert cols header
  await Promise.all(
    years.map((year, index) => {
      const col: Col = {
        props: { cycles, colType: ColType.header, colName: `${year}`, colSpan: 1, rowSpan: 1, index },
        rowId: rowHeader.id,
      }
      return client.one<Col>(
        `insert into ${schema}.col (row_id, props)
         values ($1, $2::jsonb)
         returning *;`,
        [col.rowId, JSON.stringify(col.props)],
        Objects.camelize
      )
    })
  )

  // insert cols data
  const rows = await client.map<Row>(
    `
        select r.*
        from ${schema}.row r
        where r.table_id = $1
          and r.props ->> 'variableName' in ($2:list)
        order by r.props ->> 'index'
    `,
    [table.id, variables],
    // @ts-ignore
    Objects.camelize
  )
  await Promise.all(
    variables.map(async (variable) => {
      const row = rows.find((row) => row.props.variableName === variable)

      // add calculate function to row
      const calculateFn = calculateFNs[tableName]?.[variable]
      if (calculateFn) {
        await client.query(
          `
              update ${schema}.row r
              set props = props || $1::jsonb
              where r.id = $2`,
          [JSON.stringify({ calculateFn }), row.id]
        )
      }

      return Promise.all(
        years.map((year, index) => {
          const col: Col = {
            props: { cycles, colType: ColType.decimal, colName: `${year}`, colSpan: 1, rowSpan: 1, index },
            rowId: row.id,
          }

          return client.one<Col>(
            `insert into ${schema}.col (row_id, props)
             values ($1, $2::jsonb)
             returning *;`,
            [col.rowId, JSON.stringify(col.props)],
            Objects.camelize
          )
        })
      )
    })
  )
}
