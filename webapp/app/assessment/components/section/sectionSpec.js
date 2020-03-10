// ===== Section
const descriptionsDefault = {
  introductoryText: false,
  nationalData: true,
  analysisAndProcessing: true,
  comments: true,
}

export const newSectionSpec = (sectionName = '', sectionAnchor = '', tableSections = [], descriptions = {}) => ({
  sectionName,
  sectionAnchor,
  tableSections,
  descriptions: { ...descriptionsDefault, ...descriptions },
})

// ===== Table section

export const newTableSection = (tableSpecs = [], titleKey, descriptionKey) => ({
  tableSpecs,
  titleKey,
  descriptionKey,
})

// ===== Table

export const newTableSpec = (name, rows) => ({ name, rows })

export const newRowHeader = cols => ({
  type: 'header',
  cols,
})

export const newRowData = (labelKey, cols, variableNo = null) => ({
  type: 'data',
  cols: [
    {
      type: 'header', labelKey, variableNo, className: 'fra-table__category-cell'
    },
    ...cols
  ]
})

export const newColHeader = (labelKey = null, label = null, rowSpan = 1, colSpan = 1, left = false) => ({
  type: 'header',
  labelKey,
  label,
  className: 'fra-table__header-cell' + (left ? '-left' : ''),
  rowSpan,
  colSpan
})

export const newColDecimal = () => ({
  type: 'decimal',
})

export const newColCalculated = (calculateFn) => ({
  type: 'calculated',
  calculateFn,
})


