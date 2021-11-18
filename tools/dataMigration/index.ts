import * as path from 'path'
import { config } from 'dotenv'

import { Assessment } from '../../core/meta/assessment'
import { Section } from '../../core/meta/section'
import { TableSection } from '../../core/meta/tableSection'
import { Table } from '../../core/meta/table'
import { Row } from '../../core/meta/row'
import { Col } from '../../core/meta/col'
import { Cycle } from '../../core/meta/cycle'
import { SectionSpec } from '../../webapp/sectionSpec'

import { FraSpecs } from './fraSpecs'
import { getSection } from './getSection'
import { getTableSection } from './getTableSection'
import { getTable } from './getTable'
import { getRow } from './getRow'
import { getCol } from './getCol'
import { DB } from '../../server/db'
import { getCreateSchemaDDL } from '../../server/repository/assessment/getCreateSchemaDDL'
import { Objects } from '../../core/utils/objects'

config({ path: path.resolve(__dirname, '..', '..', '.env') })

export const migrate = async (spec: Record<string, SectionSpec>): Promise<void> => {
  // const assessment = await DB.one<Assessment>(
  //   `
  //   insert into assessment (props)
  //   values ($1::jsonb)
  //   returning *;
  //   `,
  //   [JSON.stringify({ name: 'fra' })]
  // )
  // console.log(assessment)
  // console.log(FraSpecs)

  // delete old fra
  await DB.query(`drop schema if exists assessment_fra cascade`)
  await DB.query(`delete from assessment where props->>'name' = $1`, ['fra'])

  // insert assessment
  const assessment = await DB.one<Assessment>(
    `insert into assessment (props)
            values ($1::jsonb)
            returning *;`,
    [JSON.stringify({ name: 'fra' })]
  )

  // create schema
  const schema = `assessment_${assessment.props.name}`
  await DB.query(getCreateSchemaDDL(schema))

  // insert cycle
  const cycle: Cycle = await DB.one<Cycle>(`insert into ${schema}.cycle (name) values($1) returning *`, ['2020'])
  const cycles: Array<string> = [cycle.uuid]

  const sections: Array<Section> = []
  const tableSections: Array<TableSection> = []
  const tables: Array<Table> = []
  const rows: Array<Row> = []
  const cols: Array<Col> = []

  await DB.tx(async (t) => {
    await Promise.all(
      Object.values(spec).map(async (spec, index) => {
        let section = getSection({ assessmentId: assessment.id, spec, cycles, index })
        section = await t.one<Section>(
          `insert into assessment_fra.section (assessment_id,props)
                    values ($1, $2::jsonb)
                    returning *`,
          [section.assessmentId, JSON.stringify(section.props)],
          Objects.camelize
        )
        sections.push(section)

        await Promise.all(
          spec.tableSections.map(async (tableSectionSpec) => {
            let tableSection = getTableSection({ cycles, tableSectionSpec, section })
            tableSection = await t.one<TableSection>(
              `insert into assessment_fra.table_section (section_id,props) values ($1, $2::jsonb) returning *;`,
              [tableSection.sectionId, JSON.stringify(tableSection.props)],
              Objects.camelize
            )
            tableSections.push(tableSection)

            await Promise.all(
              tableSectionSpec.tableSpecs.map(async (tableSpec) => {
                let table = getTable({ cycles, tableSpec, tableSection })
                table = await t.one<Table>(
                  `insert into ${schema}."table" (table_section_id, props) values ($1, $2::jsonb) returning *;`,
                  [table.tableSectionId, JSON.stringify(table.props)],
                  Objects.camelize
                )
                tables.push(table)

                await Promise.all(
                  tableSpec.rows.map(async (rowSpec) => {
                    let row = getRow({ cycles, rowSpec, table })
                    row = await t.one<Row>(
                      `insert into ${schema}.row (table_id, props) values ($1, $2::jsonb) returning *;`,
                      [row.tableId, JSON.stringify(row.props)],
                      Objects.camelize
                    )
                    rows.push(row)

                    await Promise.all(
                      rowSpec.cols.map(async (colSpec) => {
                        let col = getCol({ cycles, colSpec, row })
                        col = await t.one<Col>(
                          `insert into ${schema}.col (row_id, props) values ($1, $2::jsonb) returning *;`,
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

    await t.query(`
        insert into ${schema}.assessment_country (country_iso)
        select country_iso
        from country
        order by country_iso;
    `)
    await t.query(`
        insert into ${schema}.assessment_region (region_code)
        select region_code
        from region
        where region_code != 'FE'
        order by region_code;
    `)
  })
}

migrate(FraSpecs)
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
