import { readdirSync, rmSync } from 'fs'
import * as fs from 'fs/promises'
import * as extract from 'extract-zip'
import * as JSON2CSV from 'json2csv'

import { compareFiles } from 'test/bulkDownloadComparison/compareFiles'
import { downloadFile } from 'test/bulkDownloadComparison/downloadFile'
import { getFileName } from 'test/bulkDownloadComparison/getFileName'

const fileNames = ['Annual', 'FRA_Years', 'Intervals']

const outPath = `${__dirname}/tmp`

afterAll(() => {
  rmSync(`${outPath}`, { recursive: true, force: true })
})

describe('Bulk Download comparison', () => {
  test('compare ', async () => {
    // Download files
    const legacyUrl = 'https://fra-data.fao.org/api/export/bulk-download'
    const localUrl = 'http://localhost:9001/api/file/bulk-download?assessmentName=fra&cycleName=2020&countryIso=WO'
    const legacy = await downloadFile(legacyUrl, outPath, 'legacy')
    const local = await downloadFile(localUrl, outPath, 'local')

    // Extract files
    await extract(local, { dir: `${outPath}/local` })
    await extract(legacy, { dir: `${outPath}/legacy` })

    // Check all needed files exist
    const localFiles = readdirSync(`${outPath}/local`, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name)
    const legacyFiles = readdirSync(`${outPath}/legacy`, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name)
    const expectedFileNames = fileNames.map((fileName: string) => getFileName(fileName)).concat('README.txt')
    expect(localFiles).toEqual(expectedFileNames)
    expect(legacyFiles).toEqual(expectedFileNames)

    // Get diff output
    const diffs = (await Promise.all(fileNames.map((fileName) => compareFiles(outPath, fileName)))).flat()

    const csv = await JSON2CSV.parseAsync(diffs)
    await fs.writeFile(`./diffs.csv`, csv)
  })
})
