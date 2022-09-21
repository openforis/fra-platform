import { readdirSync, rmSync } from 'fs'
import * as extract from 'extract-zip'

import { downloadFile } from '@test/bulkDownloadComparison/downloadFile'

// Get csv file name with timestamp
const _getFileName = (name: string): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month =
    (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : `0${(date.getMonth() + 1).toString()}`
  const day = date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate().toString()}`
  const timestamp = `${year}_${month}_${day}`
  return `${name}_${timestamp}.csv`
}

const fileNames = ['Annual', 'FRA_Years', 'Intervals']

const outPath = `${__dirname}/tmp`

afterAll(() => {
  rmSync(outPath, { recursive: true, force: true })
})

describe('Bulk Download comparison', () => {
  test('compare ', async () => {
    // Download files
    const prodUrl = 'https://fra-data.fao.org/api/export/bulk-download'
    const localUrl = 'http://localhost:9001/api/file/bulk-download?assessmentName=fra&cycleName=2020&countryIso=WO'
    const prod = await downloadFile(prodUrl, outPath, 'prod')
    const local = await downloadFile(localUrl, outPath, 'local')

    // Extract files
    await extract(local, { dir: `${outPath}/local` })
    await extract(prod, { dir: `${outPath}/prod` })

    // Check all needed files exist
    const localFiles = readdirSync(`${outPath}/local`, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name)
    const prodFiles = readdirSync(`${outPath}/prod`, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name)

    const expectedFileNames = fileNames.map((fileName: string) => _getFileName(fileName)).concat('README.txt')
    expect(localFiles).toEqual(expectedFileNames)
    expect(prodFiles).toEqual(expectedFileNames)
  })
})
