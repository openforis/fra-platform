import * as path from 'path'
import { config } from 'dotenv'

import { SectionSpec } from '../../webapp/sectionSpec'
import { Section } from '../../core/meta/section'
import { TableSection } from '../../core/meta/tableSection'
import { Table } from '../../core/meta/table'
import { Row } from '../../core/meta/row'
import { Col } from '../../core/meta/col'
import { Cycle } from '../../core/meta/cycle'

import { FraSpecs } from './fraSpecs'
import { getSection } from './getSection'
import { getTableSection } from './getTableSection'
import { getTable } from './getTable'
import { getRow } from './getRow'
import { getCol } from './getCol'

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
  const assessmentId = 1
  const cycle: Cycle = { name: '2020', uuid: 'uuid-cycle' }
  const cycles: Array<string> = [cycle.uuid]

  const sections: Array<Section> = []
  const tableSections: Array<TableSection> = []
  const tables: Array<Table> = []
  const rows: Array<Row> = []
  const cols: Array<Col> = []

  Object.entries(spec).forEach(([_, spec], index) => {
    // console.log(spec)
    const section = getSection({ assessmentId, spec, cycles, index })
    sections.push(section)

    spec.tableSections.forEach((tableSectionSpec) => {
      const tableSection = getTableSection({ cycles, tableSectionSpec, section })
      tableSections.push(tableSection)

      tableSectionSpec.tableSpecs.forEach((tableSpec) => {
        const table = getTable({ cycles, tableSpec, tableSection })
        tables.push(table)

        tableSpec.rows.forEach((rowSpec) => {
          const row = getRow({ cycles, rowSpec, table })
          rows.push(row)

          rowSpec.cols.forEach((colSpec) => {
            const col = getCol({ cycles, colSpec, row })
            cols.push(col)
          })
        })
      })
    })
  })

  // console.log('====== sections ', sections)
  // console.log('====== tableSections ', tableSections)
  // console.log('====== tables ', tables)
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
