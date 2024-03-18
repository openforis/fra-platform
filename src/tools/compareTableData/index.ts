import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as puppeteer from 'puppeteer'
import { Page } from 'puppeteer'
import { APIUtil } from 'tools/utils/API'
import { cookies } from 'tools/utils/API/cookie'

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

const _takeScreenshots = async (sourceUrl: string, targetUrl: string, tableName: string, page: Page) => {
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
    path: `${screenshotDir}/${assessmentName}-${cycleName}-${tableName}-target.png`,
  })
}

type ExtractedData = Record<string, Array<Array<string>>>
const extractTableData = async (page: Page, url: string): Promise<ExtractedData> => {
  await page.goto(url, { waitUntil: 'networkidle0' })

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

const compareTableData = async (sourceUrl: string, targetUrl: string): Promise<boolean> => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setCookie(...cookies.parse(cookies.prod, 'fra-data.fao.org'))
  await page.setCookie(...cookies.parse(cookies.local, 'localhost'))

  const sourceData = await extractTableData(page, sourceUrl)
  const targetData = await extractTableData(page, targetUrl)

  const isEqual = await Promise.all(
    Object.keys(sourceData).map(async (tableName) => {
      if (!targetData[tableName]) {
        Logger.error(`Table ${tableName} does not exist in ${targetUrl}`)
        process.exit(1)
      }

      if (JSON.stringify(sourceData[tableName]) !== JSON.stringify(targetData[tableName])) {
        Logger.debug(`Table ${tableName} is not equal`)
        await _takeScreenshots(sourceUrl, targetUrl, tableName, page)
        process.exit(1)
      }

      return true
    })
  )

  await browser.close()

  return isEqual.every((value) => value)
}

const exec = async () => {
  const countries = await APIUtil.getCountries({
    source: target,
    assessmentName,
    cycleName,
  })

  const sections = await APIUtil.getSections({
    source: target,
    assessmentName,
    cycleName,
  })

  const sectionNames = sections.flatMap<string>((section: Section) =>
    section.subSections.map<string>((subSection: SubSection) => subSection.props.name)
  )

  // eslint-disable-next-line no-restricted-syntax
  for (const country of countries) {
    // eslint-disable-next-line no-restricted-syntax
    for (const sectionName of sectionNames) {
      const sourceUrl = `${source}/assessments/${assessmentName}/${cycleName}/${country.countryIso}/sections/${sectionName}/`
      const targetUrl = `${target}/assessments/${assessmentName}/${cycleName}/${country.countryIso}/sections/${sectionName}/`

      // eslint-disable-next-line no-await-in-loop
      const isEqual = await compareTableData(sourceUrl, targetUrl)
      Logger.debug(`Tables at ${sourceUrl} and ${targetUrl} are ${isEqual ? 'equal' : 'not equal'}`)
    }
  }
}

const start = new Date().getTime()
Logger.debug(`========== START COMPARE TABLE DATA ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  process.exit(0)
})
