import * as fs from 'fs'
import * as fastCsv from 'fast-csv'

const read = async <RowType>(fileName: string, options?: fastCsv.ParserOptionsArgs): Promise<Array<RowType>> => {
  const opts: fastCsv.ParserOptionsArgs = {
    objectMode: true,
    delimiter: ',',
    discardUnmappedColumns: false,
    headers: true,
    ignoreEmpty: true,
    ...options,
  }

  return new Promise((resolve, reject) => {
    const data: Array<RowType> = []

    const readableStream = fs.createReadStream(fileName)

    fastCsv
      .parseStream(readableStream, opts)
      .on('error', (error: Error) => {
        reject(error)
      })
      .on('data', (row) => {
        data.push(row)
      })
      .on('end', () => {
        resolve(data)
      })
  })
}

export const FileCSV = {
  read,
}
