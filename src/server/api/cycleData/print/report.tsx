import { Response } from 'express'
import puppeteer, { PDFOptions } from 'puppeteer'
import { Promises } from 'utils/promises'

import { CycleRequest } from 'meta/api/request'

import Requests from 'server/utils/requests'

type Request = CycleRequest<{ onlyTables?: string }>
//
// const styleContent = `
// @page {
//   size: A4;
// }
//
// html,
// body {
//   width: 210mm;
//   height: 297mm;
//   line-height: inherit;
// }
// `

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
  const { assessmentName, cycleName, countryIso } = req.query

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  // await page.addStyleTag({ content: styleContent })
  const url = `${Requests.serverUrl(req)}/assessments/${assessmentName}/${cycleName}/${countryIso}/print/`

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

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdf.length,
      title: 'fdsa',
      'Content-Disposition': `attachment; filename="${assessmentName}_${cycleName}_${countryIso}.pdf"`,
    })
    res.setHeader('title', 'fdsafsa')
    res.send(pdf)
    res.end()
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
