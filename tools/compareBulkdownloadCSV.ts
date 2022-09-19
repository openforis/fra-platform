import * as fs from 'fs'
import * as fastCsv from 'fast-csv'

const normalize = (string: string) =>
  string
    .split(',')
    .map((x) => x.trim())
    .sort()
    .join(', ')

const _readCSV = async (fileName: string): Promise<any> => {
  const options = {
    objectMode: true,
    delimiter: ',',
    // quote: null,
    headers: true,
    renameHeaders: false,
    ignoreEmpty: true,
  }

  return new Promise((resolve, reject) => {
    const data: any = []

    const readableStream = fs.createReadStream(fileName)

    fastCsv
      .parseStream(readableStream, options)
      .on('error', (error: any) => {
        reject(error)
      })
      .on('data', (row: any) => {
        data.push(row)
      })
      .on('end', (rowCount: any) => {
        console.log(fileName, rowCount)
        resolve(data)
      })
  })
}

type FileRecord = Array<Record<string, string>>
const compareCSV = async () => {
  try {
    const fileA: FileRecord = await _readCSV(process.argv[2])
    const fileB: FileRecord = await _readCSV(process.argv[3])

    const sortedA = [...fileA].sort((a, b) => {
      if (!a.iso3) console.log('missing iso3', a)
      return a.iso3.localeCompare(b.iso3) || a.year.localeCompare(b.year)
    })

    const sortedB = [...fileB].sort((a, b) => {
      return a.iso3.localeCompare(b.iso3) || a.year.localeCompare(b.year)
    })

    const z = (a: any, b: any) => {
      // eslint-disable-next-line no-param-reassign
      if (a?.regions) a.regions = normalize(a.regions)
      // eslint-disable-next-line no-param-reassign
      if (b?.regions) b.regions = normalize(b.regions)
      return JSON.stringify(b) !== JSON.stringify(a)
    }

    sortedA.forEach((a) => {
      const found = sortedB.find((b) => a.iso3 === b.iso3 && a.year === b.year)
      if (!found) console.log('found in A, not in B:', a)
      if (z(found, a)) {
        Object.keys(a).forEach((k) => {
          if (a?.[k] !== found?.[k]) {
            console.log('a', a.iso3, a.year, k, a[k], 'b', found.iso3, found.year, found[k])
          }
        })
      }
    })

    sortedB.forEach((b) => {
      const found = sortedA.find((a) => a.iso3 === b.iso3 && a.year === b.year)
      if (!found) console.log('found in B, not in A:', b)
      if (z(found, b)) {
        Object.keys(b).forEach((k) => {
          if (b[k] !== found[k]) {
            console.log('b', b.iso3, b.year, k, b[k], found[k])
          }
        })
      }
    })
  } catch (e) {
    console.error(e)
  }
}

if (process.argv[2] && process.argv[3]) compareCSV()
else console.log('usage:\nts-node compareCSV.ts <csv1> <csv2>\nExample:\nts-node compareCSV.ts csvA.csv csvB.csv')
export {}
