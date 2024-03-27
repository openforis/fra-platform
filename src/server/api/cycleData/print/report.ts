import { Response } from 'express'
import { chromium } from 'playwright-chromium'
import { PDFOptions } from 'puppeteer'
import { Objects } from 'utils/objects'

import { CycleRequest } from 'meta/api/request'
import { Lang } from 'meta/lang'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { Logger } from 'server/utils/logger'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CycleRequest<{ force?: string; lang: Lang; onlyTables?: string }>

const margin = '5mm'
const pdfOptions: PDFOptions = {
  displayHeaderFooter: false,
  format: 'A4',
  landscape: true,
  margin: { bottom: margin, left: margin, right: margin, top: margin },
  printBackground: true,
  scale: 0.7,
}

const buildPdf = async (req: Request): Promise<Buffer> => {
  const { assessmentName, countryIso, cycleName, lang, onlyTables } = req.query

  const url = Requests.serverUrl(req)
  const browser = await chromium.launch({ chromiumSandbox: false })
  // const browser = await chromium.launch({ args: ['--no-sandbox'], headless: true })
  const page = await browser.newPage()

  const cookies = Object.entries(req.cookies).map(([name, value]: [string, string]) => ({ name, value, url }))
  await page.context().addCookies(cookies)

  const tables = onlyTables === 'true' ? 'tables' : ''
  const params = new URLSearchParams({ lang })
  const path = `/assessments/${assessmentName}/${cycleName}/${countryIso}/print/${tables}`
  const urlReportPage = `${url}${path}?${params.toString()}`
  Logger.info('')
  Logger.info('')
  Logger.info(`=============== PDF URL DOWNLOAD: ${urlReportPage}`)
  Logger.info('')
  Logger.info('')
  await page.goto(urlReportPage, { waitUntil: 'networkidle' })
  const pdf = await page.pdf(pdfOptions)
  await browser.close()

  return pdf
}

const getPdf = async (req: Request, fileName: string): Promise<Buffer> => {
  const { assessmentName, countryIso, cycleName, force } = req.query

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  const [cachedPdfInfo, countrySummary] = await Promise.all([
    CycleDataController.Report.getOne({ assessment, cycle, fileName }),
    CycleDataController.getCountrySummary({ assessment, countryIso, cycle }),
  ])
  const countryCycleLastUpdate = countrySummary?.lastUpdate

  if (Objects.isEmpty(cachedPdfInfo)) {
    const pdfBuffer = await buildPdf(req)
    await CycleDataController.Report.create({ assessment, buffer: pdfBuffer, countryIso, cycle, fileName })

    return pdfBuffer
  }

  const shouldRefreshCache =
    countryCycleLastUpdate === undefined ||
    Date.parse(cachedPdfInfo.file.createdAt) < Date.parse(countryCycleLastUpdate) ||
    force === 'true'

  if (shouldRefreshCache) {
    const pdfBuffer = await buildPdf(req)
    await CycleDataController.Report.updateFile({ assessment, buffer: pdfBuffer, countryIso, cycle, fileName })

    return pdfBuffer
  }

  return cachedPdfInfo.file.file
}

export const report = async (req: Request, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, lang, onlyTables } = req.query

    const tables = onlyTables === 'true' ? '_tables' : ''
    const fileName = `${assessmentName}_${cycleName}_${countryIso}_${lang}${tables}.pdf`
    const pdf = await getPdf(req, fileName)

    Responses.sendFile(res, fileName, pdf)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
