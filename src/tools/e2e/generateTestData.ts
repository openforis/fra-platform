import '../scriptInit'

import * as path from 'path'

import { MetadataController } from 'server/controller/metadata'
import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

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

Logger.debug(`========== START EXPORT DATABASE`)

exec().then(() => {
  Logger.debug(`========== END EXPORT DATABASE`)
  DB.$pool.end()
  process.exit(0)
})
