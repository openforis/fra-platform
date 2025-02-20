import * as fastCsv from 'fast-csv'
import * as fs from 'node:fs'

const OPTS = {
  headers: true,
  trim: true,
}

export const read = async (file: string): Promise<Array<Record<string, string>>> => {
  return new Promise((resolve, reject) => {
    const results: Array<Record<string, string>> = []

    fs.createReadStream(file)
      .pipe(fastCsv.parse(OPTS))
      .on('error', (error) => reject(error))
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
  })
}
