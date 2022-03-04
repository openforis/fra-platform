/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptNextInteger, acceptNextDecimal } from './numberInput'

const parseValue = (raw: any, type: any) => {
  if (type === 'integer') {
    return acceptNextInteger(raw, null)
  }
  if (type === 'decimal') {
    return acceptNextDecimal(raw, null)
  }
  return raw
}

const readHtmlElem = (elem: any, type: any) => {
  const rows = elem.getElementsByTagName('tr')
  return [...rows].map((row: any) => {
    const cells = row.getElementsByTagName('td')
    return [...cells].map((cell: any) => parseValue(cell.innerText, type))
  })
}

const readExcelClipboard = (evt: any, type = 'integer') => {
  const el = document.createElement('html')
  el.innerHTML = evt.clipboardData.getData('text/html')
  return readHtmlElem(el, type)
}

const readPlainTextClipboard = (evt: any, type = 'integer') => {
  const raw = evt.clipboardData.getData('text/plain')
  return [[parseValue(raw, type)]]
}

export const readPasteClipboard = (evt: any, type: any) => {
  evt.stopPropagation()
  evt.preventDefault()

  const xlsHtml = readExcelClipboard(evt, type)
  return xlsHtml.length === 0 ? readPlainTextClipboard(evt, type) : xlsHtml
}
