import { Response } from 'express'
import puppeteer, { PDFOptions } from 'puppeteer'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CycleRequest<{ forceRefresh?: string; onlyTables?: string }>

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
  const { assessmentName, cycleName, countryIso, onlyTables } = req.query

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  const tables = onlyTables === 'true' ? 'tables' : ''
  const url = `${Requests.serverUrl(req)}/assessments/${assessmentName}/${cycleName}/${countryIso}/print/${tables}`

  await Promises.each(Object.entries(req.cookies), ([name, value]: [string, string]) => {
    return page.setCookie({ name, value, url })
  })

  await page.goto(url, { waitUntil: 'networkidle0' })
  const pdf = await page.pdf(pdfOptions)
  await browser.close()

  return pdf
}

const getPdf = async (req: Request, fileName: string): Promise<Buffer> => {
  const { assessmentName, countryIso, cycleName, forceRefresh } = req.query

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  const [cachedPdfInfo, countryCycleLastUpdate] = await Promise.all([
    CycleDataController.Report.getOne({ assessment, cycle, fileName }),
    CycleDataController.getLastUpdate({ assessment, countryIso, cycle }),
  ])

  if (Objects.isEmpty(cachedPdfInfo)) {
    const pdfBuffer = await buildPdf(req)
    await CycleDataController.Report.create({ assessment, buffer: pdfBuffer, countryIso, cycle, fileName })

    return pdfBuffer
  }

  const shouldRefreshCache =
    countryCycleLastUpdate.time === undefined ||
    Date.parse(cachedPdfInfo.file.createdAt) < Date.parse(countryCycleLastUpdate.time) ||
    forceRefresh === 'true'

  if (shouldRefreshCache) {
    const pdfBuffer = await buildPdf(req)
    await CycleDataController.Report.updateFile({ assessment, buffer: pdfBuffer, countryIso, cycle, fileName })

    return pdfBuffer
  }

  return cachedPdfInfo.file.file
}

export const report = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const fileName = `${assessmentName}_${cycleName}_${countryIso}.pdf`

    const pdf = await getPdf(req, fileName)

    Responses.sendFile(res, fileName, pdf)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
