import '../scriptInit'

import * as path from 'path'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { DB } from 'server/db/db'
import { DatabaseService } from 'server/service/databaseService'

import { _copyStaticFixtures } from './_copyStaticFixtures'
import { _writeTableToFile } from './_writeTableToFile'
import { EXPORT_TABLES } from './EXPORT_TABLES'

const OUTPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  await DB.tx(async (t) => {
    const tables = EXPORT_TABLES.filter((t) => !t.skipExport)
    const allData = await DatabaseService.exportTables({ tables }, t)

    allData.forEach((tableData) => {
      _writeTableToFile(tableData, OUTPUT_DIR)
    })
  })

  _copyStaticFixtures(OUTPUT_DIR)
}

ToolsUtils.exec(exec)
