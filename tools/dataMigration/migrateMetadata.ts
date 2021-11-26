import { Section } from '../../core/meta/section'
import { TableSection } from '../../core/meta/tableSection'
import { Table } from '../../core/meta/table'
import { Row } from '../../core/meta/row'
import { Assessment } from '../../core/meta/assessment'
import { Col } from '../../core/meta/col'
import { Cycle } from '../../core/meta/cycle'
import { Objects } from '../../core/utils/objects'
import { SectionSpec } from '../../webapp/sectionSpec'
import { BaseProtocol } from '../../server/db'

import { getTable } from './getTable'
import { getTableSection } from './getTableSection'
import { getSection } from './getSection'
import { getRow } from './getRow'
import { getCol } from './getCol'

type Props = {
  assessment: Assessment
  schema: string
  spec: Record<string, SectionSpec>
  client: BaseProtocol
}

export const migrateMetadata = async (props: Props): Promise<void> => {
  const { assessment, schema, spec, client } = props

  const cycle: Cycle = await client.one<Cycle>(
    `insert into ${schema}.cycle (name)
                                           values ($1)
                                           returning *`,
    ['2020']
  )
  const cycles: Array<string> = [cycle.uuid]

  const sections: Array<Section> = []
  const tableSections: Array<TableSection> = []
  const tables: Array<Table> = []
  const rows: Array<Row> = []
  const cols: Array<Col> = []

  await Promise.all(
    Object.values(spec).map(async (spec, index) => {
      let section = getSection({ assessmentId: assessment.id, spec, cycles, index })
      section = await client.one<Section>(
        `insert into assessment_fra.section (assessment_id, props)
         values ($1, $2::jsonb)
         returning *`,
        [section.assessmentId, JSON.stringify(section.props)],
        Objects.camelize
      )
      sections.push(section)

      await Promise.all(
        spec.tableSections.map(async (tableSectionSpec) => {
          let tableSection = getTableSection({ cycles, tableSectionSpec, section })
          tableSection = await client.one<TableSection>(
            `insert into assessment_fra.table_section (section_id, props)
             values ($1, $2::jsonb)
             returning *;`,
            [tableSection.sectionId, JSON.stringify(tableSection.props)],
            Objects.camelize
          )
          tableSections.push(tableSection)

          await Promise.all(
            tableSectionSpec.tableSpecs.map(async (tableSpec) => {
              let table = getTable({ cycles, tableSpec, tableSection })
              table = await client.one<Table>(
                `insert into ${schema}."table" (table_section_id, props)
                 values ($1, $2::jsonb)
                 returning *;`,
                [table.tableSectionId, JSON.stringify(table.props)],
                Objects.camelize
              )
              tables.push(table)

              await Promise.all(
                tableSpec.rows.map(async (rowSpec) => {
                  let row = getRow({ cycles, rowSpec, table })
                  row = await client.one<Row>(
                    `insert into ${schema}.row (table_id, props)
                     values ($1, $2::jsonb)
                     returning *;`,
                    [row.tableId, JSON.stringify(row.props)],
                    Objects.camelize
                  )
                  rows.push(row)

                  await Promise.all(
                    rowSpec.cols.map(async (colSpec) => {
                      let col = getCol({ cycles, colSpec, row })
                      col = await client.one<Col>(
                        `insert into ${schema}.col (row_id, props)
                         values ($1, $2::jsonb)
                         returning *;`,
                        [col.rowId, JSON.stringify(col.props)],
                        Objects.camelize
                      )
                      cols.push(col)
                    })
                  )
                })
              )
            })
          )
        })
      )
    })
  )
}
