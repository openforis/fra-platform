import '../scriptInit'

import * as path from 'path'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { DB } from 'server/db/db'

import { _copyStaticFixtures } from './utils/copyStaticFixtures'
import { DBService } from './utils/dbService/dbService'
import { EXPORT_TABLES } from './utils/EXPORT_TABLES'
import { _writeTableToFile } from './utils/writeTableToFile'

const OUTPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  await DB.tx(async (t) => {
    const tables = EXPORT_TABLES.filter((t) => !t.skipExport)
    const allData = await DBService.exportTables({ tables }, t)

    allData.forEach((tableData) => {
      _writeTableToFile(tableData, OUTPUT_DIR)
    })
  })

  _copyStaticFixtures(OUTPUT_DIR)
}

ToolsUtils.exec(exec)
