import * as fs from 'fs'
import * as path from 'path'

import { ExportedTableData } from 'meta/metadata/export'

import { Logger } from 'server/utils/logger'

// Exports to baseDir/schema/table.json
export const _writeTableToFile = (data: ExportedTableData, baseDir: string): void => {
  const { schema, table } = data

  const schemaDir = path.join(baseDir, schema)
  if (!fs.existsSync(schemaDir)) {
    fs.mkdirSync(schemaDir, { recursive: true })
  }

  const filePath = path.join(schemaDir, `${table}.json`)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  Logger.debug(`OK: Exported ${schema}.${table} --> ${filePath} (${data.rowCount} rows)`)
}
