import * as pgPromise from 'pg-promise'

import { Assessment as AssessmentLegacy } from '../../../.src.legacy/core/assessment'
import { Assessment } from '../../../src/meta/assessment/assessment'
import { ColProps, ColType } from '../../../src/meta/assessment/col'
import { RowProps } from '../../../src/meta/assessment/row'
import { SectionProps } from '../../../src/meta/assessment/section'
import { TableProps } from '../../../src/meta/assessment/table'
import { TableSectionProps } from '../../../src/meta/assessment/tableSection'
import { BaseProtocol } from '../../../src/server/db'
import { SectionSpec } from '../../../src/test/sectionSpec'
import { DBNames } from '../_DBNames'
import { getMapping } from '../dataTable/tableMappings'
import { isBasicTable } from '../migrateData/_repos'
import { getCol } from './getCol'
import { getRow } from './getRow'
import { getSection, getSubSection } from './getSection'
import { getTable } from './getTable'
import { getTableSection } from './getTableSection'
import { migrateClimaticDomain } from './migrateClimaticDomain'
import { migrateDegradedForest } from './migrateDegradedForest'

type Props = {
  assessment: Assessment
  assessmentLegacy: AssessmentLegacy
  // schema: string
  spec: Record<string, SectionSpec>
  client: BaseProtocol
}

type SectionInsert = { id: number; parent_id: number | null; props: SectionProps }
type TableSectionInsert = { id: number; section_id: number; props: TableSectionProps }
type TableInsert = { id: number; table_section_id: number; props: TableProps }
type RowInsert = { id: number; table_id: number; props: RowProps }
type ColInsert = { id: number; row_id: number; props: ColProps }

export const migrateMetadata = async (props: Props): Promise<void> => {
  const { assessment, assessmentLegacy, spec, client } = props

  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  const cycles = assessment.cycles.map((c) => c.uuid)

  const sectionsInsert: Array<SectionInsert> = []
  const tableSectionsInsert: Array<TableSectionInsert> = []
  const tablesInsert: Array<TableInsert> = []
  const rowsInsert: Array<RowInsert> = []
  const colsInsert: Array<ColInsert> = []

  let sectionId = 0
  let tableSectionId = 0
  let tableId = 0
  let rowId = 0
  let colId = 0

  await Promise.all(
    Object.entries(assessmentLegacy.sections).map(async ([index, sectionLegacy]) => {
      const section = getSection({ labelKey: sectionLegacy.label, index: Number(index), cycles })
      const sectionInsert: SectionInsert = { id: (sectionId += 1), parent_id: null, props: section.props }
      sectionsInsert.push(sectionInsert)

      await Promise.all(
        Object.values(sectionLegacy.children).map(async (subSectionLegacy, i) => {
          const subSectionSpec = spec[subSectionLegacy.name]
          const subSection = getSubSection({ assessment, spec: subSectionSpec, index: Number(i) })

          const subSectionInsert = { id: (sectionId += 1), parent_id: sectionInsert.id, props: subSection.props }
          sectionsInsert.push(subSectionInsert)

          await Promise.all(
            subSectionSpec.tableSections.map(async (tableSectionSpec) => {
              const tableSection = getTableSection({ assessment, subSection, tableSectionSpec })
              const tableSectionInsert = {
                id: (tableSectionId += 1),
                section_id: subSectionInsert.id,
                props: tableSection.props,
              }
              tableSectionsInsert.push(tableSectionInsert)

              await Promise.all(
                tableSectionSpec.tableSpecs.map(async (tableSpec) => {
                  const mapping = isBasicTable(tableSpec.name) ? getMapping(tableSpec.name) : null
                  const table = getTable({ assessment, tableSpec, tableSection, mapping })
                  const tableInsert = {
                    id: (tableId += 1),
                    table_section_id: tableSectionInsert.id,
                    props: table.props,
                  }
                  tablesInsert.push(tableInsert)

                  let rowIdx = 0
                  await Promise.all(
                    tableSpec.rows.map(async (rowSpec) => {
                      const row = getRow({ assessment, rowSpec, table })
                      if (mapping && mapping.rows.names[rowIdx] && rowSpec.type === 'data') {
                        row.props.variableName = mapping.rows.names[rowIdx]
                        rowIdx += 1
                      }

                      const rowInsert = {
                        id: (rowId += 1),
                        table_id: tableInsert.id,
                        props: row.props,
                      }
                      rowsInsert.push(rowInsert)

                      let colIdx = 0
                      await Promise.all(
                        rowSpec.cols.map(async (colSpec) => {
                          const col = getCol({ assessment, colSpec, row })
                          const colName = rowSpec.migration?.colNames?.[colIdx]
                          const colNameOrig = col.props.colName
                          const withColNameMigration = col.props.colType !== 'header' && colName
                          if (withColNameMigration) {
                            col.props.colName = colName
                            colIdx += 1
                          } else if (
                            mapping &&
                            rowSpec.type === 'data' &&
                            [
                              ColType.decimal,
                              ColType.integer,
                              ColType.selectYesNo,
                              ColType.select,
                              ColType.text,
                              ColType.textarea,
                            ].includes(col.props.colType)
                          ) {
                            const columnMapping = mapping.columns[colIdx]
                            col.props.colName = columnMapping.name
                            colIdx += 1
                          }
                          if (col.forceColName) col.props.colName = colNameOrig

                          const colInsert = {
                            id: (colId += 1),
                            row_id: rowInsert.id,
                            props: col.props,
                          }
                          colsInsert.push(colInsert)
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

  const pgp = pgPromise()
  // insert sections
  const sectionsCS = new pgp.helpers.ColumnSet(['id', 'parent_id', { name: 'props', cast: 'jsonb' }], {
    table: { table: 'section', schema },
  })
  await client.none(pgp.helpers.insert(sectionsInsert, sectionsCS))
  // insert table sections
  const tableSectionsCS = new pgp.helpers.ColumnSet(['id', 'section_id', { name: 'props', cast: 'jsonb' }], {
    table: { table: 'table_section', schema },
  })
  await client.none(pgp.helpers.insert(tableSectionsInsert, tableSectionsCS))
  // insert tables
  const tablesCS = new pgp.helpers.ColumnSet(['id', 'table_section_id', { name: 'props', cast: 'jsonb' }], {
    table: { table: 'table', schema },
  })
  await client.none(pgp.helpers.insert(tablesInsert, tablesCS))
  // insert rows
  const rowsCS = new pgp.helpers.ColumnSet(['id', 'table_id', { name: 'props', cast: 'jsonb' }], {
    table: { table: 'row', schema },
  })
  await client.none(pgp.helpers.insert(rowsInsert, rowsCS))
  // insert cols
  const colsCS = new pgp.helpers.ColumnSet(['id', 'row_id', { name: 'props', cast: 'jsonb' }], {
    table: { table: 'col', schema },
  })
  await client.none(pgp.helpers.insert(colsInsert, colsCS))
  // update pk id sequence
  await client.query(`
      SELECT pg_catalog.setval(pg_get_serial_sequence('${schema}.section', 'id'),
                               (SELECT MAX(id) FROM ${schema}.section) + 1);
      SELECT pg_catalog.setval(pg_get_serial_sequence('${schema}.table_section', 'id'),
                               (SELECT MAX(id) FROM ${schema}.table_section) + 1);
      SELECT pg_catalog.setval(pg_get_serial_sequence('${schema}.table', 'id'),
                               (SELECT MAX(id) FROM ${schema}.table) + 1);
      SELECT pg_catalog.setval(pg_get_serial_sequence('${schema}.row', 'id'),
                               (SELECT MAX(id) FROM ${schema}.row) + 1);
      SELECT pg_catalog.setval(pg_get_serial_sequence('${schema}.col', 'id'),
                               (SELECT MAX(id) FROM ${schema}.col) + 1);
  `)

  await migrateDegradedForest({ assessment }, client)
  await migrateClimaticDomain({ assessment }, client)
}
