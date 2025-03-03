import { createI18nPromise } from 'i18n/i18nFactory'
import puppeteer, { PDFOptions } from 'puppeteer'
import { Promises } from 'utils/promises'

import { Areas, CountryIso } from 'meta/area'
import { AssessmentName, Assessments, CycleName } from 'meta/assessment'
import { Lang } from 'meta/lang'

import { ProcessEnv } from 'server/utils'

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

const marginH = '5mm'
const marginV = '15mm'

const pdfOptions: PDFOptions = {
  displayHeaderFooter: true,
  footerTemplate: `
    <div style="width: 100%; font-size: 8px; text-align: center; color: #555; padding-bottom: 5mm;font-family: 'Open Sans', sans-serif;">
      <span class="pageNumber"></span>
    </div>
  `,
  headerTemplate: '<div></div>',
  format: 'A4',
  landscape: true,
  margin: { bottom: marginV, left: marginH, right: marginH, top: marginV },
  printBackground: true,
  scale: 0.7,
}

export const generate = async (props: Props): Promise<Buffer> => {
  const { appUri, assessmentName, cookies, countryIso, cycleName, lang, onlyTables } = { ...defaultProps, ...props }
  const { t } = await createI18nPromise(lang)
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  const headerText = t('print.header', {
    assessmentName: t(Assessments.getShortLabel(assessmentName)),
    cycleName,
    countryName: t(Areas.getTranslationKey(countryIso)),
  })

  pdfOptions.headerTemplate = `
    <div style="width: 100%; padding: 0 ${marginH}; box-sizing: border-box;">
      <div style="width: 100%; box-sizing: border-box; border-top: 1px solid #1798a5;">
        <div style="font-size: 8px; text-align: left; color: #555; font-family: 'Open Sans', sans-serif;padding-top: 1mm;">
          ${headerText}
        </div>
      </div>
    </div>
  `

  const tables = onlyTables === 'true' ? 'tables' : ''
  const path = `/assessments/${assessmentName}/${cycleName}/${countryIso}/print/${tables}`
  const params = new URLSearchParams({ lang })
  const url = `${appUri}${path}?${params.toString()}`

  await Promises.each(Object.entries(cookies), ([name, value]) => {
    page.setCookie({ name, value: value.toString(), url })
  })

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

  const pdf = await page.pdf(pdfOptions)
  await browser.close()

  return pdf
}
