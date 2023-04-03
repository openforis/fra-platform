import * as fs from 'fs/promises'
import * as path from 'path'
import { Numbers } from '@utils/numbers'
import * as pgPromise from 'pg-promise'

import { Assessment, Cycle, RowType, Table } from '@meta/assessment'

import { MetadataController } from '@server/controller/metadata'
import { BaseProtocol, Schemas } from '@server/db'
import { FileCSV } from '@server/utils/fileCSV'
import { Logger } from '@server/utils/logger'

import { NodeRow } from '@test/dataMigration/types'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

type CSVRowItem = { country: string; indicator: string; item: string; [key: string]: string }

// ======== TODO
// ======== 1. fix table.props.columNames to include all data columns
// ======== 2. add row.props.variableName to all data rows
// ======== 3. add col.props.colName to all data columns (area,comment,comment_trends)
// ======== 4. investigate tables/rows/cols missing from TODO below

export const migrateCountryComments = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // ======== get all assessment section names
  const sectionNames = await client.map<string>(
    `
        select distinct s.props ->> 'name' as name
        from ${schemaAssessment}.section s
        where s.props ->> 'name' is not null
    `,
    [],
    ({ name }) => name
  )
  // ======== get all sections metadata
  const sectionsMetadata = await MetadataController.getSectionsMetadata({ assessment, cycle, sectionNames }, client)
  // ======== create convenient record<tableName,Table>
  const tables = Object.values(sectionsMetadata).reduce<Record<string, Table>>((acc, tableSections) => {
    const result = { ...acc }
    tableSections.forEach((tableSection) =>
      tableSection.tables.forEach((table) => {
        result[table.props.name] = table
      })
    )
    return result
  }, {})

  // ======== get all file names to import
  const pathCSV = path.resolve(__dirname, 'CSV')
  const fileNames = (await fs.readdir(pathCSV)).filter((fileName) => !fileName.includes('RN'))

  Logger.info(`Processing ${fileNames.length} files`)

  // ======== read CSV content files and add them to insert values
  const values: Array<NodeRow> = []
  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i < fileNames.length; i += 1) {
    const fileName = fileNames[i]
    const p = ((i + 1) / fileNames.length) * 100
    // ======== prepare metadata
    const tableIdx = fileName.replace('.csv', '').replace('_C', '_').replace('.', '_')
    const tableName = `country_comments_${tableIdx}`
    Logger.info(`==== ${i + 1}/${fileNames.length} (${Numbers.format(p)})%  -> ${fileName} `)
    const table = tables[tableName]

    // TODO: investigate why tables are not found
    if (!table) {
      Logger.warn(`!!!! Table ${tableName} ${tableIdx} not found`)
      // eslint-disable-next-line no-continue
      continue
    }

    // TODO: investigate the table below
    // temp hack
    if (['2.5_C1.csv'].includes(fileName)) {
      // eslint-disable-next-line no-continue
      continue
    }
    const rowsData = table.rows.filter(
      (r) => ![RowType.header, RowType.placeholder, RowType.noticeMessage].includes(r.props.type)
    )

    // ======== read CSV file content
    const pathCsvFile = path.resolve(pathCSV, fileName)
    // eslint-disable-next-line no-await-in-loop
    const csvRows = await FileCSV.read<CSVRowItem>(pathCsvFile, { escape: '"', quote: '"' })
    // ======== iterate csv rows
    let countryIso = ''
    let rowIndex = -1
    csvRows.forEach((csvRow) => {
      if (csvRow.country !== countryIso) {
        countryIso = csvRow.country
        rowIndex = -1
      }
      // ======== get row and cols
      rowIndex += 1
      const row = rowsData[rowIndex]

      // TODO: investigate why rows are not found
      if (!row) {
        Logger.warn(`!!!! Row not found ${tableName} ${rowIndex} ${rowsData.length} ${JSON.stringify(csvRow)}`)
      }
      if (row) {
        // convert csv row -> db node type
        const columnNames = table.props.columnNames[cycle.uuid]
        columnNames.forEach((columnName) => {
          const col = row.cols.find((c) => c.props.colName === columnName)

          // TODO: investigate why cols are not found
          if (!col) {
            Logger.warn(`!!!! Col not found ${tableName} ${row.props.variableName} ${columnName}`)
          }
          if (col) {
            const nodeRow: NodeRow = {
              country_iso: csvRow.country,
              row_uuid: row.uuid,
              col_uuid: col.uuid,
              value: { raw: csvRow[columnName] ?? null },
            }
            values.push(nodeRow)
          }
        })
      }
    })
  }

  // prepare db column set
  const pgp = pgPromise()
  const columns = ['country_iso', 'row_uuid', 'col_uuid', { name: 'value', cast: 'jsonb' }]
  const options = { table: { table: 'node', schema: schemaCycle } }
  const cs = new pgp.helpers.ColumnSet(columns, options)
  // insert values into db
  const query = pgp.helpers.insert(values, cs)
  await client.query(query)
}
