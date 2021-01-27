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
  const rows = elem.getElementsByTagName('tr')
  return R.map(row => {
    return R.map(cell => {
      return parseValue(cell.innerText, type)
    }, row.getElementsByTagName('td'))
  }, rows)
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
