import * as fastCsv from 'fast-csv'
import * as fs from 'node:fs'

const OPTS = {
  headers: true,
  trim: true,
}

type ROW_BASE = Record<string, string>

export const read = async <ROW extends ROW_BASE = ROW_BASE>(file: string): Promise<Array<ROW>> => {
  return new Promise((resolve, reject) => {
    const results: Array<ROW> = []

    fs.createReadStream(file)
      .pipe(fastCsv.parse(OPTS))
      .on('error', (error) => reject(error))
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
  })
}
