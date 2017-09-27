import * as R from 'ramda'

import {acceptNextInteger, acceptNextDecimal} from './numberInput'

const parseValue = (raw, type) => {
  if(R.equals('integer', type)) {
    return acceptNextInteger(raw, null)
  }
  if(R.equals('decimal', type)) {
    return acceptNextDecimal(raw, null)
  }
  return raw
}

const readHtmlElem = (elem, type) => {
  const data = []
  const rows = elem.getElementsByTagName('tr')
  R.map(row => {
    const rdata = []
    R.map(cell => {
      rdata.push(parseValue(cell.innerText, type))
    }, row.getElementsByTagName('td'))
    data.push(rdata)
  }, rows)
  return data
}

const readExcelClipboard = (evt, type = 'integer') => {
  const el = document.createElement('html')
  el.innerHTML = evt.clipboardData.getData('text/html')
  return readHtmlElem(el, type)
}

const readPlainTextClipboard = (evt, type = 'integer') => {
  const raw = evt.clipboardData.getData('text/plain')
  return [[parseValue(raw, type)]]
}

export const readPasteClipboard = (evt, type) => {
  evt.stopPropagation()
  evt.preventDefault()

  const xlsHtml = readExcelClipboard(evt, type)
  return R.isEmpty(xlsHtml) ? readPlainTextClipboard(evt, type) : xlsHtml
}
