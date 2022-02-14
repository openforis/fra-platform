import { Assessment, Col, ColType, Row, SubSection, Table, TableSection } from '../../../meta/assessment'
import { Assessment as AssessmentLegacy } from '../../../core/assessment'
import { SectionSpec } from '../../../webapp/sectionSpec'
import { BaseProtocol } from '../../../server/db'
import { getSection, getSubSection } from '../getSection'
import { Objects } from '../../../core/utils'
import { getTableSection } from '../getTableSection'
import { getTable } from '../getTable'
import { isBasicTable } from '../migrateData/_repos'
import { getMapping } from '../dataTable/tableMappings'
import { getRow } from '../getRow'
import { getCol } from '../getCol'
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

                  const mapping = isBasicTable(table) ? getMapping(table.props.name) : null

                  let rowIdx = 0
                  await Promise.all(
                    tableSpec.rows.map(async (rowSpec) => {
                      let row = getRow({ cycles, rowSpec, table })
                      if (mapping && rowSpec.type === 'data') {
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
                          if (
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
        'plantationForestArea',
        'plantationForestIntroducedArea',
        'otherPlantedForestArea',
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
}
