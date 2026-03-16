import puppeteer, { LaunchOptions, Page, PDFOptions } from 'puppeteer'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'
import { Promises } from 'utils/promises'

import { I18n, ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

type Props = {
  appUri?: string
  assessmentName: AssessmentName
  cookies?: Record<string, unknown>
  countryIso: CountryIso
  cycleName: CycleName
  lang?: Lang
  onlyTables?: string
}
const defaultProps: Partial<Props> = {
  appUri: ProcessEnv.appUri,
  cookies: {},
  lang: Lang.en,
}

const marginH = '12px'
const marginBottom = '32px'
const marginTop = '20px'

const pdfOptions: PDFOptions = {
  displayHeaderFooter: true,
  footerTemplate: `
    <style>#footer { padding: 0 !important; }</style>
    <div style="width: 100%; height: ${marginBottom}; position: relative; font-size: 8px; text-align: center; color: #939393;">
      <span class="pageNumber" style="position: absolute; top: 50%; transform: translateY(-50%);"></span>
    </div>
  `,
  headerTemplate: '<div></div>',
  format: 'A4',
  // landscape: true,
  margin: { bottom: marginBottom, left: marginH, right: marginH, top: marginTop },
  printBackground: true,
  scale: 0.7,
}

// Pass --debug to open the browser window and wait for Enter before closing
const debug = process.argv.includes('--debug')
const browserOptions: LaunchOptions = debug ? { headless: false, defaultViewport: null } : { headless: true }

export const generate = async (props: Props): ReturnType<Page['pdf']> => {
  const { appUri, assessmentName, cookies, countryIso, cycleName, lang, onlyTables } = { ...defaultProps, ...props }
  const { t } = await I18n.get({ lang })
  const browser = await puppeteer.launch(browserOptions)
  const page = await browser.newPage()

  const headerText = t('print.header', {
    assessmentName: t(Assessments.getShortLabel(assessmentName)),
    cycleName,
    countryName: t(Areas.getTranslationKey(countryIso)),
  })

  pdfOptions.headerTemplate = `
    <div style="margin-top: -14px; width: 100%; padding: 0 ${marginH}; box-sizing: border-box;">
      <div style="width: 100%; box-sizing: border-box; border-top: 1px solid #1798a5; font-size: 8px; text-align: left; color: #939393; font-style: italic;">
          ${headerText}
      </div>
    </div>
  `

  const tables = onlyTables === 'true' ? 'tables' : ''
  const path = `/assessments/${assessmentName}/${cycleName}/${countryIso}/print/${tables}`
  const params = new URLSearchParams({ lang })
  const url = `${appUri}${path}?${params.toString()}`

  await Promises.each(Object.entries(cookies), ([name, value]) => {
    browser.setCookie({ name, value: value.toString(), domain: appUri })
  })

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

  if (process.stdin.isTTY && debug) {
    Logger.debug('Browser window opened. Press Enter to generate PDF and close the browser...')
    await new Promise<void>((resolve) => {
      process.stdin.once('data', () => resolve())
    })
  }

  const pdf = await page.pdf(pdfOptions)
  await browser.close()

  return pdf
}
