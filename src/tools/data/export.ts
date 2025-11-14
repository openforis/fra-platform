import '../scriptInit'

import * as path from 'path'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { MetadataController } from 'server/controller/metadata'
import { DB } from 'server/db/db'

import { _writeTableToFile } from './_writeTableToFile'

const OUTPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  await DB.tx(async (t) => {
    const allData = await MetadataController.exportAll(t)

    allData.forEach((tableData) => {
      _writeTableToFile(tableData, OUTPUT_DIR)
    })
  })
}

ToolsUtils.exec(exec)
