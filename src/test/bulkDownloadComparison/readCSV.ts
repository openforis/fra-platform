import * as fs from 'fs'
import * as fastCsv from 'fast-csv'

import { RawFile, RawFileRow } from 'test/bulkDownloadComparison/types'

export const readCSV = async (fileName: string, options?: fastCsv.ParserOptions): Promise<RawFile> => {
  const opts = {
    objectMode: true,
    delimiter: ',',
    headers: true,
    ignoreEmpty: true,
    ...options,
  }

  return new Promise((resolve, reject) => {
    const data: RawFile = []

    const readableStream = fs.createReadStream(fileName)

    fastCsv
      .parseStream(readableStream, opts)
      .on('error', (error: Error) => {
        reject(error)
      })
      .on('data', (row: RawFileRow) => {
        data.push(row)
      })
      .on('end', () => {
        resolve(data)
      })
  })
}
