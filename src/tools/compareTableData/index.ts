import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import { Page } from 'puppeteer'
import { Cluster } from 'puppeteer-cluster'
import { APIUtil } from 'tools/utils/API'
import { cookies } from 'tools/utils/API/cookie'

import { CountryIso } from 'meta/area'
import { Section, SubSection } from 'meta/assessment'

import { Logger } from 'server/utils/logger'

if ([cookies.prod, cookies.local].includes('add-your-cookie')) {
  Logger.error('\x1b[31mPlease add your production cookie to:\x1b[0m\nsrc/tools/utils/API/cookie.ts')

  process.exit(1)
}

const screenshotDir = '/tmp/ss'

const target = 'https://fra-data.fao.org'
const source = 'http://localhost:9000'

const assessmentName = 'fra'
const cycleName = '2025'

type ExtractedData = Record<string, Array<Array<string>>>

type Difference = {
  source: Array<Array<string>>
  target: Array<Array<string>>
  sourceUrl: string
  targetUrl: string
  countryIso: CountryIso
  tableName: string
  row: Array<string>
  i: number
}

const differences: Array<Difference> = []

const _takeScreenshots = async (
  sourceUrl: string,
  targetUrl: string,
  countryIso: CountryIso,
  tableName: string,
  page: Page
) => {
  // make dir if not exist
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir)
  }
  await page.goto(sourceUrl, { waitUntil: 'networkidle0' })
  const tableSource = await page.$(`#${tableName}`)
  await tableSource.screenshot({ path: `${screenshotDir}/${assessmentName}-${cycleName}-${tableName}-source.png` })
  await page.goto(targetUrl, { waitUntil: 'networkidle0' })
  const tableHandleTarget = await page.$(`#${tableName}`)
  await tableHandleTarget.screenshot({
    path: `${screenshotDir}/${assessmentName}-${cycleName}-${countryIso}-${tableName}-target.png`,
  })
}

const extractTableData = async (page: Page, url: string): Promise<ExtractedData> => {
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.waitForTimeout(2000)

  const selector = '.fra-table.data-table'
  const tables = await page.$$(selector)

  const dataObject: ExtractedData = {}
  await Promise.all(
    tables.map(async (table) => {
      const rows = await table.$$('tr')
      const tableName = await table.evaluate((node) => node.getAttribute('id')) // Get table id
      const rowData = await Promise.all(
        rows.map(async (row) => {
          const cells = await row.$$('td')
          return Promise.all(cells.map((cell) => cell.evaluate((node) => node.textContent)))
        })
      )
      dataObject[tableName] = rowData
    })
  )

  return dataObject
}

const compareTableData = async (countryIso: CountryIso, sectionName: string, page: Page): Promise<boolean> => {
  await page.setCookie(...cookies.parse(cookies.prod, 'fra-data.fao.org'))
  await page.setCookie(...cookies.parse(cookies.local, 'localhost'))

  const sourceUrl = `${source}/assessments/${assessmentName}/${cycleName}/${countryIso}/sections/${sectionName}/`
  const targetUrl = `${target}/assessments/${assessmentName}/${cycleName}/${countryIso}/sections/${sectionName}/`

  const sourceData = await extractTableData(page, sourceUrl)
  const targetData = await extractTableData(page, targetUrl)

  const isEqual = await Promise.all(
    Object.keys(sourceData).map(async (tableName) => {
      if (!targetData[tableName]) {
        Logger.error(`Table ${tableName} does not exist in ${targetUrl}`)
        process.exit(1)
      }

      if (JSON.stringify(sourceData[tableName]) !== JSON.stringify(targetData[tableName])) {
        Logger.debug(`\x1b[31mNOK:\x1b[0m: ${assessmentName} ${cycleName} ${countryIso} ${sectionName}`)
        Logger.debug(`Table ${tableName} is not equal`)
        Logger.debug(`Source: ${sourceUrl}`)
        Logger.debug(`Target: ${targetUrl}`)

        sourceData[tableName].forEach((row, i) => {
          if (JSON.stringify(row) !== JSON.stringify(targetData[tableName][i])) {
            differences.push({
              source: sourceData[tableName],
              target: targetData[tableName],
              sourceUrl,
              targetUrl,
              countryIso,
              tableName,
              row,
              i,
            })
          }
        })

        await _takeScreenshots(sourceUrl, targetUrl, countryIso, tableName, page)

        // exit on error
        // process.exit(1)
      }

      return true
    })
  )

  return isEqual.every((value) => value)
}

const exec = async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
  })

  const countries = await APIUtil.getCountries({
    source: target,
    assessmentName,
    cycleName,
  })

  const countryIsos = countries.map((country) => country.countryIso)

  const sections = await APIUtil.getSections({
    source: target,
    assessmentName,
    cycleName,
  })

  const sectionNames = sections.flatMap<string>((section: Section) =>
    section.subSections.map<string>((subSection: SubSection) => subSection.props.name)
  )

  await cluster.task(
    async ({
      page,
      data: { countryIso, sectionName },
    }: {
      page: Page
      data: { countryIso: CountryIso; sectionName: string }
    }) => {
      const processed = countryIsos.findIndex((c) => c === countryIso) + 1
      const count = countryIsos.length
      Logger.debug(`Processing ${countryIso} (${processed}/${count}) ${sectionName}`)

      // eslint-disable-next-line no-await-in-loop
      await compareTableData(countryIso, sectionName, page)
      Logger.debug(`OK: ${assessmentName} ${cycleName} ${countryIso} ${sectionName}`)
    }
  )

  await Promise.all(
    countryIsos.map(async (countryIso) => {
      await Promise.all(
        sectionNames.map(async (sectionName) => {
          cluster.queue({ countryIso, sectionName })
        })
      )
    })
  )
  await cluster.idle()
  await cluster.close()

  if (differences.length) {
    Logger.error(`Differences found: ${differences.length}`)

    differences.forEach((diff) => {
      Logger.error(`Country: ${diff.countryIso}`)
      Logger.error(`Table: ${diff.tableName}`)
      Logger.error(`Source: ${diff.sourceUrl}`)
      Logger.error(`Target: ${diff.targetUrl}`)
      Logger.error(`Row: ${diff.i}`)
      Logger.error(`Source: ${diff.row}`)
      Logger.error(`Target: ${diff.target[diff.i]}`)
      Logger.error('---')
    })

    process.exit(1)
  }
}

const start = new Date().getTime()
Logger.debug(`========== START COMPARE TABLE DATA ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  process.exit(0)
})
