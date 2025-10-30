import { Sanitizer } from 'client/utils/sanitizer'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const parseValue = (raw: any, type: any) => {
  if (type === 'integer') {
    return Sanitizer.acceptNextInteger(raw, null)
  }
  if (type === 'decimal') {
    return Sanitizer.acceptNextDecimal(raw, null)
  }
  return raw
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const readHtmlElem = (elem: any, type: any) => {
  const rows = elem.getElementsByTagName('tr')
  return [...rows].map((row: any) => {
    const cells = row.getElementsByTagName('td')
    return [...cells].map((cell: any) => parseValue(cell.innerText, type))
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const readExcelClipboard = (evt: any, type = 'integer') => {
  const el = document.createElement('html')
  el.innerHTML = evt.clipboardData.getData('text/html')
  return readHtmlElem(el, type)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const readPlainTextClipboard = (evt: any, type = 'integer') => {
  const raw = evt.clipboardData.getData('text/plain')
  return [[parseValue(raw, type)]]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const readPasteClipboard = (evt: any, type: any) => {
  evt.stopPropagation()
  evt.preventDefault()

  const xlsHtml = readExcelClipboard(evt, type)
  return xlsHtml.length === 0 ? readPlainTextClipboard(evt, type) : xlsHtml
}
