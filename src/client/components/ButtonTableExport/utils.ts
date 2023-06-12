// Inspiration/base from cheerio-tableparser
//
const normalizeString = (string = '') => string.trim().replace(/\s/g, ' ')

const getElementText = ({ element }: any): any => {
  const { children, innerText } = element

  if (element.classList.contains('no-csv')) return ''

  if (element.nodeName === 'SELECT') {
    return normalizeString(element.options[element.selectedIndex].text)
  }
  if (children.length > 0) {
    return Array.from(children).reduce(
      (text, child) => normalizeString(`${text} ${getElementText({ element: child })}`),
      ''
    )
  }
  return normalizeString(innerText)
}

export const getData = (tableElement: any, dupCols = true, dupRows = true, textMode = true, formatToNumber = true) => {
  if (!tableElement) {
    return []
  }
  // Initialize variables
  const columns: any = []
  let currentX = 0
  let currentY = 0
  Array.from(tableElement.rows).forEach((row) => {
    currentY = 0
    // Handle both table haders and table cells
    Array.from((row as any).cells).forEach((column) => {
      const { rowSpan, colSpan }: any = column
      let content = textMode ? getElementText({ element: column }) : (column as any).innerHTML
      if (formatToNumber)
        content = Number.isNaN(Number.parseFloat(content.replace(/\s/g, ''))) ? content : content.replace(/\s/g, '')
      // Handle spanning cells
      for (let x = 0; x < rowSpan; x += 1) {
        for (let y = 0; y < colSpan; y += 1) {
          if (columns[currentY + y] === undefined) {
            columns[currentY + y] = []
          }
          while (columns[currentY + y][currentX + x] !== undefined) {
            currentY += 1
            if (columns[currentY + y] === undefined) {
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
  return columns[0].map((_: any, i: any) => columns.map((row: any) => row[i]))
}
