import * as fs from 'fs/promises'
import * as path from 'path'
import * as pgPromise from 'pg-promise'
import { Numbers } from 'utils/numbers'

import { Assessment, Cycle, RowType, Table } from 'meta/assessment'

import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, Schemas } from 'server/db'
import { FileCSV } from 'server/utils/fileCSV'
import { Logger } from 'server/utils/logger'

import { NodeRow } from 'test/dataMigration/types'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

type CSVRowItem = { country: string; indicator: string; item: string; [key: string]: string }

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
  const showHidden = true
  const sectionsMetadata = await MetadataController.getSectionsMetadata(
    { assessment, cycle, sectionNames, showHidden },
    client
  )
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
  // for (let i = 0; i < fileNames.length; i += 1) {
  //   const fileName = fileNames[i]
  //   const p = ((i + 1) / fileNames.length) * 100
  //   // ======== prepare metadata
  //   const tableIdx = fileName.replace('.csv', '').replace('_C', '_').replace('.', '_')
  //   const tableName = `country_comments_${tableIdx}`
  //   Logger.info(`==== ${i + 1}/${fileNames.length} (${Numbers.format(p)})%  -> ${fileName} -> ${tableName}`)
  //   const table = tables[tableName]
  //   if (!table) {
  //     Logger.error(`Table not found for tableName: ${tableName}`)
  //   }
  //
  //   const rowsData = table.rows.filter(
  //     (r) => ![RowType.header, RowType.placeholder, RowType.noticeMessage].includes(r.props.type)
  //   )
  //
  //   // ======== read CSV file content
  //   const pathCsvFile = path.resolve(pathCSV, fileName)
  //   // eslint-disable-next-line no-await-in-loop
  //   const csvRows = await FileCSV.read<CSVRowItem>(pathCsvFile, { escape: '"', quote: '"' })
  //   // ======== iterate csv rows
  //   let countryIso = ''
  //   let rowIndex = -1
  //   csvRows.forEach((csvRow) => {
  //     if (csvRow.country !== countryIso) {
  //       countryIso = csvRow.country
  //       rowIndex = -1
  //     }
  //     // ======== get row and cols
  //     rowIndex += 1
  //     const row = rowsData[rowIndex]
  //
  //     // TODO: investigate why rows are not found
  //     // 6_9_2 -> CSV is incorrect. It is the same as 6_9_1
  //     // 4_9_2 -> There is one empty row per country in the CSV.
  //     // 3_4_2 -> There are 4 empty rows per country in the CSV.
  //     // 3_4_2 -> Sometimes they are not empty, but the excel have no category per row. Just empty rows there.
  //     // 2_5_1 -> CSV does not map the table, by index as expected.
  //
  //     if (!row) {
  //       Logger.warn(`!!!! Row not found ${tableName} ${rowIndex} ${rowsData.length} ${JSON.stringify(csvRow)}`)
  //     }
  //     if (row) {
  //       // convert csv row -> db node type
  //       const columnNames = table.props.columnNames[cycle.uuid]
  //       columnNames.forEach((columnName) => {
  //         const col = row.cols.find((c) => c.props.colName === columnName)
  //
  //         if (col) {
  //           const nodeRow: NodeRow = {
  //             country_iso: csvRow.country,
  //             row_uuid: row.uuid,
  //             col_uuid: col.uuid,
  //             value: { raw: csvRow[columnName] ?? null },
  //           }
  //           values.push(nodeRow)
  //         }
  //       })
  //     }
  //   })
  // }

  // ======== LOOP WITH LOGS FOR TABLE 442
  for (let i = 0; i < fileNames.length; i += 1) {
    const fileName = fileNames[i]
    const p = ((i + 1) / fileNames.length) * 100
    // ======== prepare metadata
    const tableIdx = fileName.replace('.csv', '').replace('_C', '_').replace('.', '_')
    const tableName = `country_comments_${tableIdx}`
    Logger.info(`==== ${i + 1}/${fileNames.length} (${Numbers.format(p)})%  -> ${fileName} -> ${tableName}`)

    const table = tables[tableName]
    if (tableName === 'country_comments_4_4_2' || tableName === 'country_comments_4_4_1') {
      Logger.info(`Table data: ${JSON.stringify(table)}`)
    }
    if (!table) {
      Logger.error(`Table not found for tableName: ${tableName}`)
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

      if (!row) {
        Logger.warn(`!!!! Row not found ${tableName} ${rowIndex} ${rowsData.length} ${JSON.stringify(csvRow)}`)
        return // skip to the next row if the current row isn't found
      }

      // convert csv row -> db node type
      const columnNames = table.props.columnNames[cycle.uuid]
      columnNames.forEach((columnName) => {
        const col = row.cols.find((c) => c.props.colName === columnName)

        if (col) {
          const nodeRow: NodeRow = {
            country_iso: csvRow.country,
            row_uuid: row.uuid,
            col_uuid: col.uuid,
            value: { raw: csvRow[columnName] ?? null },
          }
          values.push(nodeRow)

          // Log added NodeRow only for the specified table
          if (tableName === 'country_comments_4_4_2') {
            Logger.info(`Adding NodeRow: ${JSON.stringify(nodeRow)}`)
          }
        }
      })
    })
  }
  // ======== END LOOP WITH LOGS FOR TABLE 442

  // prepare db column set
  const pgp = pgPromise()
  const columns = ['country_iso', 'row_uuid', 'col_uuid', { name: 'value', cast: 'jsonb' }]
  const options = { table: { table: 'node', schema: schemaCycle } }
  const cs = new pgp.helpers.ColumnSet(columns, options)
  // insert values into db
  const query = pgp.helpers.insert(values, cs)
  try {
    await client.query(query)
  } catch (err) {
    Logger.error(`An error occurred when executing the query: ${err}`)
  }
}
