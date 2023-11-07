// Inspiration/base from cheerio-tableparser
//

const normalizeString = (string = '') => string.trim().replace(/\s/g, ' ')

const _getElementText = (element: HTMLElement): string => {
  const { children, innerText } = element

  if (element.classList.contains('no-csv')) return ''

  if (element.nodeName === 'SELECT') {
    const select = element as HTMLSelectElement
    return normalizeString(select.options[select.selectedIndex].text)
  }

  if (element.classList.contains('autocomplete-input__wrapper')) {
    const input = Array.from(children).find((x) => x.nodeName === 'INPUT') as HTMLInputElement
    return normalizeString(input.value)
  }

  if (children.length > 0) {
    return Array.from(children).reduce(
      (text, child) => normalizeString(`${text} ${_getElementText(child as HTMLElement)}`),
      ''
    )
  }
  return normalizeString(innerText)
}

export const getData = (
  table: HTMLTableElement,
  dupCols = true,
  dupRows = true,
  textMode = true,
  formatToNumber = true
): Array<object> => {
  if (!table) {
    return []
  }
  // Initialize variables
  const columns: Array<Array<string>> = []
  let currentX = 0
  let currentY = 0
  Array.from(table.rows).forEach((row) => {
    currentY = 0
    // Handle both table haders and table cells
    Array.from(row.cells).forEach((column) => {
      const { rowSpan, colSpan } = column
      let content = textMode ? _getElementText(column) : column.innerHTML
      if (formatToNumber)
        content = Number.isNaN(Number.parseFloat(content.replace(/\s/g, ''))) ? content : content.replace(/\s/g, '')
      // Handle spanning cells
      for (let x = 0; x < rowSpan; x += 1) {
        for (let y = 0; y < colSpan; y += 1) {
          if (!columns[currentY + y]) {
            columns[currentY + y] = []
          }

          while (columns[currentY + y][currentX + x]) {
            currentY += 1
            if (!columns[currentY + y]) {
              columns[currentY + y] = []
            }
          }

          const condition = (x === 0 || dupRows) && (y === 0 || dupCols)
          columns[currentY + y][currentX + x] = condition ? content : ''
        }
      }
      currentY += 1
    })
    currentX += 1
  })
  // transpose matrix
  return columns[0].map((_, i) => columns.map((row) => row[i]))
}
