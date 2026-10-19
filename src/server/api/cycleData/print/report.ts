import { Response } from 'express'
import puppeteer, { Page, PDFOptions } from 'puppeteer'

import { CountryRequest } from 'meta/api/request/country'
import { Lang } from 'meta/lang'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { ReportController } from 'server/controller/cycleData/report'
import { Buffers } from 'server/utils/buffers'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CountryRequest<{ force?: string; lang: Lang; onlyTables?: string }>

const margin = '5mm'
const pdfOptions: PDFOptions = {
  displayHeaderFooter: false,
  format: 'A4',
  landscape: true,
  margin: { bottom: margin, left: margin, right: margin, top: margin },
  printBackground: true,
  scale: 0.7,
}

const buildPdf = async (req: Request): ReturnType<Page['pdf']> => {
  const { assessmentName, countryIso, cycleName, lang, onlyTables } = req.query

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  const tables = onlyTables === 'true' ? 'tables' : ''
  const params = new URLSearchParams({ lang })
  const path = `/assessments/${assessmentName}/${cycleName}/${countryIso}/print/${tables}`
  const url = `${Requests.serverUrl(req)}${path}?${params.toString()}`

  await Promises.each(Object.entries(req.cookies), ([name, value]: [string, string]) => {
    return page.setCookie({ name, value, url })
  })

  await page.goto(url, { waitUntil: 'networkidle0' })
  const pdf = await page.pdf(pdfOptions)
  await browser.close()

  return pdf
}

const getPdf = async (req: Request, fileName: string): ReturnType<Page['pdf']> => {
  const { countryIso, force } = req.query

  const { assessment, cycle } = req.context

  const [cachedPdfInfo, country] = await Promise.all([
    ReportController.getOne({ assessment, cycle, fileName }),
    AreaController.getCountry({ assessment, countryIso, cycle }),
  ])
  const countryCycleLastUpdate = country?.lastUpdate

  if (Objects.isEmpty(cachedPdfInfo)) {
    const bufferView = await buildPdf(req)
    await ReportController.create({ assessment, bufferView, countryIso, cycle, fileName })

    return bufferView
  }

  const shouldRefreshCache =
    countryCycleLastUpdate === undefined ||
    Date.parse(cachedPdfInfo.file.createdAt) < Date.parse(countryCycleLastUpdate) ||
    force === 'true'

  if (shouldRefreshCache) {
    const bufferView = await buildPdf(req)
    await ReportController.updateFile({ assessment, bufferView, countryIso, cycle, fileName })

    return bufferView
  }

  // Convert Readable to Buffer
  const chunks = []
  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of cachedPdfInfo.file.file) {
    chunks.push(chunk)
  }

  return Buffer.concat(chunks)
}

export const report = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessmentName, countryIso, cycleName, lang, onlyTables } = req.query

    const tables = onlyTables === 'true' ? '_tables' : ''
    const fileName = `${assessmentName}_${cycleName}_${countryIso}_${lang}${tables}.pdf`
    const bufferView = await getPdf(req, fileName)

    Responses.sendFile(res, fileName, Buffers.fromBufferView({ bufferView }))
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
