import '../scriptInit'

import * as path from 'path'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { DB } from 'server/db/db'
import { DatabaseService } from 'server/service/databaseService'

import { _writeTableToFile } from './_writeTableToFile'

const OUTPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  await DB.tx(async (t) => {
    const allData = await DatabaseService.exportTables(t)

    allData.forEach((tableData) => {
      _writeTableToFile(tableData, OUTPUT_DIR)
    })
  })
}

ToolsUtils.exec(exec)
