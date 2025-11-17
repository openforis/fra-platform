import '../scriptInit'

import * as fs from 'fs'
import * as path from 'path'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { DB } from 'server/db/db'
import { DatabaseService } from 'server/service/databaseService'

import { _readTableFromFile } from './_readTableFromFile'

const INPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  const files = await fs.promises.readdir(INPUT_DIR, { recursive: true })

  await DB.tx(async (t) => {
    // array of [[schema, table], ..]
    const schemaTables = files.reduce((acc, file) => {
      if (file.endsWith('json')) acc.push(file.split('/'))
      return acc
    }, [])
    const allData = schemaTables.map(([schema, table]) => _readTableFromFile(schema, table, INPUT_DIR))

    await DatabaseService.importTables(allData, t)
  })
}

ToolsUtils.exec(exec)
