// Inspiration/base from cheerio-tableparser
//
const normalizeString = (string = '') => string.trim().replace(/\s/g, ' ')
// @ts-expect-error ts-migrate(7024) FIXME: Function implicitly has return type 'any' because ... Remove this comment to see the full error message
const getElementText = ({ element }: any) => {
  const { children, innerText } = element
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowSpan' does not exist on type '{}'.
      const { rowSpan, colSpan } = column
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
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
  return columns[0].map((_: any, i: any) => columns.map((row) => row[i]))
}
