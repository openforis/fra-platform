import * as R from 'ramda'

const readHtmlElem = elem => {
  const data = []
  const rows = elem.getElementsByTagName('tr')
  R.map(row => {
    const rdata = []
    R.map(cell => {
      rdata.push(Number(cell.innerText))
    }, row.getElementsByTagName('td'))
    data.push(rdata)
  }, rows)
  return data
}

const readExcelClipboard = evt => {
  const el = document.createElement('html')
  el.innerHTML = evt.clipboardData.getData('text/html')
  return readHtmlElem(el)
}

const readPlainTextClipboard = evt => {
  return [[Number(evt.clipboardData.getData('text/plain'))]]
}

export const readPasteClipboard = evt => {
  evt.stopPropagation()
  evt.preventDefault()

  const xlsHtml = readExcelClipboard(evt)
  return R.isEmpty(xlsHtml) ? readPlainTextClipboard(evt) : xlsHtml
}
