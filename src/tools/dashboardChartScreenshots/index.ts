import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as path from 'path'
import { setTimeout } from 'node:timers/promises'
import { Page } from 'puppeteer'
import { Cluster } from 'puppeteer-cluster'
import { APIUtil } from 'tools/utils/API'

import { CountryIso } from 'meta/area'
import { Lang } from 'meta/lang'

const HOST = 'https://fra-data.fao.org'
const ASSESSMENT_NAME = 'fra'
const CYCLE_NAME = '2020'
const BASE_URL = `${HOST}/assessments/${ASSESSMENT_NAME}/${CYCLE_NAME}`
const DIR = path.join(__dirname, 'ss')

const languages = Object.values(Lang)

const _mkDir = () => {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR)
}

type TaskProps = { page: Page; data: { countryIso: CountryIso; lang: Lang } }

const _takeScreenshots = async (countryISOs: Array<CountryIso>) => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
  })

  await cluster.task(async ({ page, data: { countryIso, lang } }: TaskProps) => {
    // select page we want to screenshot
    const url = `${BASE_URL}/${countryIso}/home/overview/?lang=${lang}`
    await page.goto(url, { waitUntil: 'networkidle2' })

    await setTimeout(2000)

    // select parent element
    const parentElement = await page.$('.app-view__content .statistical-factsheets')

    // select all child elements
    const childElements = await parentElement.$$('.row-l, .row-m, .row-s')

    const titles = [
      'forest_area_1990_2020',
      'forest_growth_stock_and_carbon_1990_2020',
      'forest_area_of_land_area_2020',
      'primary_forest_of_forest_area_2020',
      'forest_area_within_protected_areas_2020_of_forest_area',
      'forest_ownership_2015',
      'primary_designated_management_objective_1990_2020',
      'naturally_regenerating_forest_area_1990_2020',
    ]

    for (let i = 0; i < childElements.length; i += 1) {
      const child = childElements[i]
      const title = titles[i]

      const fileName = `screenshot_${ASSESSMENT_NAME}_${CYCLE_NAME}_${countryIso}_${lang}_${title}.png`
      // eslint-disable-next-line no-await-in-loop
      await child.screenshot({ path: path.join(DIR, fileName), type: 'jpeg', quality: 100 })
    }
  })

  // eslint-disable-next-line no-restricted-syntax
  for (const lang of languages) {
    // eslint-disable-next-line no-restricted-syntax
    for (const countryIso of countryISOs) {
      cluster.queue({ countryIso, lang })
    }
  }

  await cluster.idle()
  await cluster.close()
}

const exec = async () => {
  _mkDir()
  const { countries } = await APIUtil.getCountries({
    source: HOST,
    assessmentName: ASSESSMENT_NAME,
    cycleName: CYCLE_NAME,
  })
  const countryISOs = countries.map((country) => country.countryIso)
  await _takeScreenshots(countryISOs)
}

exec()
