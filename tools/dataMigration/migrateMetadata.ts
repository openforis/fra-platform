import { Assessment as AssessmentLegacy } from '../../core/assessment'
import { Assessment, Col, Row, SubSection, Table, TableSection } from '../../meta/assessment'
import { Objects } from '../../core/utils/objects'
import { SectionSpec } from '../../webapp/sectionSpec'
import { BaseProtocol } from '../../server/db'

import { getTable } from './getTable'
import { getTableSection } from './getTableSection'
import { getSection, getSubSection } from './getSection'
import { getRow } from './getRow'
import { getCol } from './getCol'

type Props = {
  assessment: Assessment
  assessmentLegacy: AssessmentLegacy
  schema: string
  spec: Record<string, SectionSpec>
  client: BaseProtocol
}

export const migrateMetadata = async (props: Props): Promise<void> => {
  const { assessment, assessmentLegacy, schema, spec, client } = props

  const cycles = assessment.cycles.map((c) => c.uuid)

  // const sections: Array<SubSection> = []
  const tableSections: Array<TableSection> = []
  const tables: Array<Table> = []
  const rows: Array<Row> = []
  const cols: Array<Col> = []

  await Promise.all(
    Object.entries(assessmentLegacy.sections).map(async ([index, sectionLegacy]) => {
      let section = getSection({ labelKey: sectionLegacy.label, index: Number(index), cycles })
      section = await client.one<SubSection>(
        `insert into assessment_fra.section (props)
         values ($1::jsonb)
         returning *`,
        [JSON.stringify(section.props)],
        Objects.camelize
      )

      await Promise.all(
        Object.values(sectionLegacy.children).map(async (subSectionLegacy, i) => {
          const subSectionSpec = spec[subSectionLegacy.name]
          let subSection = getSubSection({ spec: subSectionSpec, cycles, index: Number(i) })

          subSection = await client.one<SubSection>(
            `insert into assessment_fra.section (parent_id, props)
                    values ($1, $2::jsonb)
                    returning *`,
            [section.id, JSON.stringify(subSection.props)],
            Objects.camelize
          )

          await Promise.all(
            subSectionSpec.tableSections.map(async (tableSectionSpec) => {
              let tableSection = getTableSection({ cycles, tableSectionSpec, section: subSection })
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
    })
  )
}
