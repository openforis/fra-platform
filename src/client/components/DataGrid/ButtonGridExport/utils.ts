// Converts one or mutiple white spaces or break lines into one space.
const normalizeString = (string = '') => string.trim().replace(/\s+/g, ' ')

const _getElementText = (element: HTMLElement): string => {
  if (typeof element === 'string') return normalizeString(element)

  const { children, innerText, style } = element

  if (style && (style.visibility === 'hidden' || style.display === 'none')) return ''

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

type DataRow = Array<string>
type TableData = Array<DataRow>

export const getDataGridData = (grid: HTMLDivElement): TableData => {
  if (!grid) {
    return []
  }
  const data: TableData = []
  const cells = grid.querySelectorAll('.data-cell')
  let currentRow: DataRow = []

  cells.forEach((cell) => {
    const isLastCol = cell.classList.contains('lastCol')

    const cellText = _getElementText(cell as HTMLElement)

    currentRow.push(cellText)

    if (isLastCol) {
      data.push([...currentRow])
      currentRow = []
    }
  })

  return data
}
