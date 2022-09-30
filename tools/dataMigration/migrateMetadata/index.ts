import { Assessment as AssessmentLegacy } from '../../../.src.legacy/core/assessment'
import { SectionSpec } from '../../../.src.legacy/webapp/sectionSpec'
import { Assessment } from '../../../src/meta/assessment/assessment'
import { Col, ColType } from '../../../src/meta/assessment/col'
import { Row } from '../../../src/meta/assessment/row'
import { SubSection } from '../../../src/meta/assessment/section'
import { Table } from '../../../src/meta/assessment/table'
import { TableSection } from '../../../src/meta/assessment/tableSection'
import { BaseProtocol } from '../../../src/server/db'
import { Objects } from '../../../src/utils'
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
import { migrateTableWithODP } from './migrateTableWithODP'

type Props = {
  assessment: Assessment
  assessmentLegacy: AssessmentLegacy
  schema: string
  spec: Record<string, SectionSpec>
  client: BaseProtocol
}

export const migrateMetadata = async (props: Props): Promise<void> => {
  const { assessment, assessmentLegacy, schema, spec, client } = props

  const assessmentSchema = DBNames.getAssessmentSchema(assessment.props.name)
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
        `insert into ${assessmentSchema}.section (props)
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
            `insert into ${assessmentSchema}.section (parent_id, props)
             values ($1, $2::jsonb)
             returning *`,
            [section.id, JSON.stringify(subSection.props)],
            Objects.camelize
          )

          await Promise.all(
            subSectionSpec.tableSections.map(async (tableSectionSpec) => {
              let tableSection = getTableSection({ cycles, tableSectionSpec, section: subSection })
              tableSection = await client.one<TableSection>(
                `insert into ${assessmentSchema}.table_section (section_id, props)
                 values ($1, $2::jsonb)
                 returning *;`,
                [tableSection.sectionId, JSON.stringify(tableSection.props)],
                Objects.camelize
              )
              tableSections.push(tableSection)

              await Promise.all(
                tableSectionSpec.tableSpecs.map(async (tableSpec) => {
                  const mapping = isBasicTable(tableSpec.name) ? getMapping(tableSpec.name) : null
                  let table = getTable({ assessment, cycles, tableSpec, tableSection, mapping })
                  table = await client.one<Table>(
                    `insert into ${schema}."table" (table_section_id, props)
                     values ($1, $2::jsonb)
                     returning *;`,
                    [table.tableSectionId, JSON.stringify(table.props)],
                    Objects.camelize
                  )
                  tables.push(table)

                  let rowIdx = 0
                  await Promise.all(
                    tableSpec.rows.map(async (rowSpec) => {
                      let row = getRow({ cycles, rowSpec, table })
                      if (mapping && mapping.rows.names[rowIdx] && rowSpec.type === 'data') {
                        row.props.variableName = mapping.rows.names[rowIdx]
                        rowIdx += 1
                      }

                      row = await client.one<Row>(
                        `insert into ${schema}.row (table_id, props)
                         values ($1, $2::jsonb)
                         returning *;`,
                        [row.tableId, JSON.stringify(row.props)],
                        Objects.camelize
                      )
                      rows.push(row)

                      let colIdx = 0
                      await Promise.all(
                        rowSpec.cols.map(async (colSpec) => {
                          let col = getCol({ cycles, colSpec, row })
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
                              ColType.taxon,
                            ].includes(col.props.colType)
                          ) {
                            const columnMapping = mapping.columns[colIdx]
                            col.props.colName = columnMapping.name
                            colIdx += 1
                          }
                          if (col.forceColName) col.props.colName = colNameOrig

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

  await migrateDegradedForest({ assessment }, client)
  await migrateTableWithODP(
    {
      assessment,
      tableName: 'extentOfForest',
      variables: ['forestArea', 'otherWoodedLand', 'otherLand', 'totalLandArea'],
    },
    client
  )
  await migrateTableWithODP(
    {
      assessment,
      tableName: 'forestCharacteristics',
      variables: [
        'naturalForestArea',
        'plantedForest',
        'plantationForestArea',
        'plantationForestIntroducedArea',
        'otherPlantedForestArea',
        'totalForestArea',
        'forestArea',
      ],
    },
    client
  )
  await migrateTableWithODP(
    {
      assessment,
      tableName: 'growingStockAvg',
      variables: [
        'naturallyRegeneratingForest',
        'plantationForest',
        'otherPlantedForest',
        'otherWoodedLand',
        'plantedForest',
        'forest',
      ],
    },
    client
  )
  await migrateTableWithODP(
    {
      assessment,
      tableName: 'growingStockTotal',
      variables: [
        'naturallyRegeneratingForest',
        'plantationForest',
        'otherPlantedForest',
        'otherWoodedLand',
        'plantedForest',
        'forest',
      ],
    },
    client
  )
  await migrateClimaticDomain({ assessment }, client)
}
