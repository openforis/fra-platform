/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from 'ramda'

import { acceptNextInteger, acceptNextDecimal } from './numberInput'

const parseValue = (raw: any, type: any) => {
  if (R.equals('integer', type)) {
    return acceptNextInteger(raw, null)
  }
  if (R.equals('decimal', type)) {
    return acceptNextDecimal(raw, null)
  }
  return raw
}

const readHtmlElem = (elem: any, type: any) => {
  const rows = elem.getElementsByTagName('tr')
  return R.map((row: any) => {
    return R.map((cell: any) => {
      return parseValue(cell.innerText, type)
    }, row.getElementsByTagName('td'))
  }, rows)
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
  return R.isEmpty(xlsHtml) ? readPlainTextClipboard(evt, type) : xlsHtml
}
