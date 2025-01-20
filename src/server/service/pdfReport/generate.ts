import puppeteer, { PDFOptions } from 'puppeteer'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'
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

const margin = '5mm'
const pdfOptions: PDFOptions = {
  displayHeaderFooter: false,
  format: 'A4',
  landscape: true,
  margin: { bottom: margin, left: margin, right: margin, top: margin },
  printBackground: true,
  scale: 0.7,
}

export const generate = async (props: Props): Promise<Buffer> => {
  const { appUri, assessmentName, cookies, countryIso, cycleName, lang, onlyTables } = { ...defaultProps, ...props }

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

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
