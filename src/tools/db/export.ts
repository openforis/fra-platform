import '../scriptInit'

import path from 'path'

import { EXPORT_TABLES } from 'tools/db/config/EXPORT_TABLES'
import { copyStaticFixtures } from 'tools/db/io/copyStaticFixtures'
import { writeTableToFile } from 'tools/db/io/writeTableToFile'
import { DBService } from 'tools/db/service'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { DB } from 'server/db/db'

const OUTPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  await DB.tx(async (t) => {
    const tables = EXPORT_TABLES.filter((t) => !t.skipExport)
    const allData = await DBService.exportTables({ tables }, t)

    allData.forEach((tableData) => {
      writeTableToFile(tableData, OUTPUT_DIR)
    })
  })

  copyStaticFixtures(OUTPUT_DIR)
}

ToolsUtils.exec(exec)
