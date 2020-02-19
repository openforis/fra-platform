// Inspiration/base from cheerio-tableparser
//

import { groupSeparator } from '@common/bignumberUtils'

export const getData = (
  tableElement,
  dupCols = true,
  dupRows = true,
  textMode = true,
) => {

  if (!tableElement) {
    return []
  }

  // Initialize variables

  const columns = []
  let currentX = 0
  let currentY = 0

  Array.from(tableElement.rows).forEach(row => {
    currentY = 0
    // Handle both table haders and table cells
    Array.from(row.cells).forEach(column => {
      const { rowSpan, colSpan } = column
      const content = textMode ? column.innerText.trim().replace(/\s/g, ' ') : column.innerHTML

      // Handle spanning cells
      for (let x = 0; x < rowSpan; x++) {
        for (let y = 0; y < colSpan; y++) {
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
  return columns[0].map((_, i) => columns.map(row => row[i]))
}
