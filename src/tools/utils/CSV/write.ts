import * as fs from 'node:fs'

import { Logger } from 'server/utils/logger'

export const write = async (arr: Array<unknown>, fileName: string): Promise<void> => {
  const header = Object.keys(arr[0]).join(',')
  const csv = arr.map((d) => Object.values(d).join(','))

  const dir = 'tmp'
  const filename = `${fileName}.csv`

  // create dir if not exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(`${dir}/${filename}`, `${header}\n${csv.join('\n')}`)

  Logger.debug(`CSV file written: ${dir}/${filename}`)
}
