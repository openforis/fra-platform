import { Objects } from 'utils/objects'

// Converts one or mutiple white spaces or break lines into one space.
const normalizeString = (string = '') => string.trim().replace(/\s+/g, ' ')

const _getElementText = (element: HTMLElement): string => {
  if (typeof element === 'string') return normalizeString(element)

  const { children, innerText } = element
  const computedStyle = getComputedStyle(element)

  if (computedStyle && (computedStyle.visibility === 'hidden' || computedStyle.display === 'none')) return ''

  if (element.classList.contains('no-csv')) return ''

  // Unwanted hidden text from editorWYSIWYG
  if (element.classList.contains('jodit_hidden')) return ''

  if (element.nodeName === 'TEXTAREA') {
    const { value } = element as HTMLTextAreaElement
    return normalizeString(value)
  }

  if (element.nodeName === 'SELECT') {
    const select = element as HTMLSelectElement
    return normalizeString(select.options[select.selectedIndex].text)
  }

  if (children.length > 0) {
    return Array.from(children).reduce(
      (text, child) => normalizeString(`${text} ${_getElementText(child as HTMLElement)}`),
      ''
    )
  }

  return normalizeString(innerText)
}

const _getCellSpans = (props: {
  cell: Element
  columnCount: number
  rowCount: number
}): { colSpan: number; rowSpan: number } => {
  const { cell, columnCount, rowCount } = props
  const style = getComputedStyle(cell)

  const parseValue = (value: string, type: 'col' | 'row'): number => {
    if (value === 'auto') return 1
    if (value.startsWith('span')) return parseInt(value.split(' ')[1], 10)
    if (value.includes('/')) {
      const [start, end] = value.split('/').map((v) => v.trim())
      if (start === '1' && end === '-1') {
        // Spans the entire row or column
        return type === 'col' ? columnCount : rowCount
      }
      return Math.abs(parseInt(end, 10) - parseInt(start, 10))
    }
    return parseInt(value, 10)
  }

  const colSpan = parseValue(style.gridColumn, 'col')
  const rowSpan = parseValue(style.gridRow, 'row')

  return { colSpan, rowSpan }
}

type DataRow<T> = Array<T | null>
type GridData<T extends Element | string> = Array<DataRow<T>>

export const getDataGridElementMatrix = (grid: HTMLDivElement): GridData<Element> => {
  if (!grid) {
    return []
  }
  const gridStyle = getComputedStyle(grid)
  const columnCount = gridStyle.getPropertyValue('grid-template-columns').split(' ').length
  const rowCount = gridStyle.getPropertyValue('grid-template-rows').split(' ').length

  const elementMatrix: GridData<Element> = Array.from({ length: rowCount }, () => new Array(columnCount).fill(null))

  const cells = Array.from(grid.children)

  const findNextAvailablePosition = (): { row: number; col: number } | null => {
    for (let row = 0; row < elementMatrix.length; row += 1) {
      for (let col = 0; col < elementMatrix[row].length; col += 1) {
        if (Objects.isNil(elementMatrix[row][col])) {
          return { col, row }
        }
      }
    }
    return null
  }

  cells.forEach((cell) => {
    const nextAvailablePosition = findNextAvailablePosition()
    if (Objects.isNil(nextAvailablePosition)) return
    const { col, row } = nextAvailablePosition

    const { rowSpan, colSpan } = _getCellSpans({ cell, columnCount, rowCount })

    for (let r = row; r < row + rowSpan && r < rowCount; r += 1) {
      for (let c = col; c < col + colSpan && c < columnCount; c += 1) {
        elementMatrix[r][c] = cell
      }
    }
  })

  return elementMatrix
}

export const getDataGridData = (grid: HTMLDivElement): GridData<string> => {
  if (!grid) {
    return []
  }
  const elementMatrix = getDataGridElementMatrix(grid)

  const rowCount = elementMatrix.length
  const columnCount = elementMatrix[0]?.length || 0
  const data: GridData<string> = Array.from({ length: rowCount }, () => new Array(columnCount).fill(null))

  elementMatrix.forEach((row, rowIndex) => {
    let noticeMessageAdded = false

    row.forEach((cell, colIndex) => {
      if (Objects.isEmpty(cell)) {
        data[rowIndex][colIndex] = ''
        return
      }

      const isNoticeMessage = cell.classList.contains('table-grid__notice-message-cell')

      let cellContent = _getElementText(cell as HTMLElement)
      const spaceFreeContent = cellContent.replace(/\s/g, '')
      cellContent =
        Number.isNaN(Number.parseFloat(spaceFreeContent)) || Number.isNaN(Number(spaceFreeContent))
          ? cellContent
          : spaceFreeContent

      if (isNoticeMessage) {
        if (!noticeMessageAdded) {
          data[rowIndex][colIndex] = cellContent
          noticeMessageAdded = true
        } else {
          data[rowIndex][colIndex] = ''
        }
      } else {
        data[rowIndex][colIndex] = cellContent
      }
    })
  })

  return data
}
