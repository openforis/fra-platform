import * as fs from 'fs'
import * as path from 'path'
import { ExportedTableData } from 'tools/db/service/exportTables'

import { Logger } from 'server/utils/logger'

export const readTableFromFile = (schema: string, table: string, baseDir: string): ExportedTableData => {
  const filePath = path.join(baseDir, schema, `${table}.json`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const data: ExportedTableData = JSON.parse(fileContent)

  Logger.debug(`OK: Imported ${schema}.${table} from ${filePath} (${data.rowCount} rows)`)

  return data
}
