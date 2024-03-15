import { Response } from 'express'
import puppeteer, { PDFOptions } from 'puppeteer'
import { Promises } from 'utils/promises'

import { CycleRequest } from 'meta/api/request'

import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CycleRequest<{ onlyTables?: string }>

const margin = '5mm'
const pdfOptions: PDFOptions = {
  displayHeaderFooter: false,
  format: 'A4',
  landscape: true,
  margin: { bottom: margin, left: margin, right: margin, top: margin },
  printBackground: true,
  scale: 0.7,
}

const getPdf = async (req: Request): Promise<Buffer> => {
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

export const report = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const pdf = await getPdf(req)
    const fileName = `${assessmentName}_${cycleName}_${countryIso}.pdf`

    Responses.sendFile(res, fileName, pdf)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
