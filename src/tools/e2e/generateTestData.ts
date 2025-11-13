import '../scriptInit'

import * as path from 'path'
import { Promises } from 'utils/promises'

import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

import { _exportTable } from './_exportTable'
import { _writeTableToFile } from './_writeTableToFile'
import { tables } from './tables'

const OUTPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  await DB.tx(async (t) => {
    await Promises.each(tables, async (tableConfig) => {
      const data = await _exportTable(tableConfig, t)
      _writeTableToFile(data, OUTPUT_DIR)
    })
  })
}

Logger.debug(`========== START EXPORT DATABASE`)

exec().then(() => {
  Logger.debug(`========== END EXPORT DATABASE`)
  DB.$pool.end()
  process.exit(0)
})
