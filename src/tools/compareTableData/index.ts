import 'tsconfig-paths/register'
import 'dotenv/config'

import * as puppeteer from 'puppeteer'
import { Page } from 'puppeteer'
import { APIUtil } from 'tools/utils/API'

import { Section, SubSection } from 'meta/assessment'

import { Logger } from 'server/utils/logger'

const target = 'https://fra-data.fao.org'
const source = 'localhost:9001'

const assessmentName = 'fra'
const cycleName = '2025'

type ExtractedData = Array<Array<Array<string>>>
const extractTableData = async (page: Page, url: string): Promise<ExtractedData> => {
  await page.goto(url, { waitUntil: 'networkidle0' })
  const evaluation = await page.$$eval('.fra-table .data-table', (tables: Array<HTMLTableElement>) =>
    tables.map((table) => {
      const rows = Array.from(table.querySelectorAll('tr'))
      return rows.map((row) => {
        const cells = Array.from(row.querySelectorAll('td'))
        return cells.map((cell) => cell.innerText)
      })
    })
  )
  return evaluation
}

const compareTableData = async (sourceUrl: string, targetUrl: string): Promise<boolean> => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const sourceData = await extractTableData(page, sourceUrl)
  const targetData = await extractTableData(page, targetUrl)

  await browser.close()

  return JSON.stringify(sourceData) === JSON.stringify(targetData)
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
      const sourceUrl = `http://${source}/assessments/${assessmentName}/${cycleName}/${country}/sections/${sectionName}/`
      const targetUrl = `${target}/assessments/${assessmentName}/${cycleName}/${country}/sections/${sectionName}/`

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
