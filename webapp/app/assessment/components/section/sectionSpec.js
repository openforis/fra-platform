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

export const newTableSpec = (name, rows) => ({ name, rows: rows.map((row, idx) => ({ idx, ...row })) })

export const newRowHeader = cols => ({
  type: 'header',
  cols: cols.map((col, idx) => ({ idx, ...col })),
})

export const newRowData = (labelKey, cols, variableNo = null, linkToSection = null) => ({
  type: 'data',
  cols: [
    {
      idx: 0,
      type: 'header',
      labelKey,
      variableNo,
      linkToSection,
      className: 'fra-table__category-cell',
    },
    ...cols.map((col, idx) => ({ idx: idx + 1, ...col })),
  ],
})

export const newColHeader = (labelKey = null, label = null, rowSpan = 1, colSpan = 1, left = false) => ({
  type: 'header',
  labelKey,
  label,
  className: `fra-table__header-cell${left ? '-left' : ''}`,
  rowSpan,
  colSpan,
})

export const newColDecimal = () => ({
  type: 'decimal',
})

export const newColCalculated = calculateFn => ({
  type: 'calculated',
  calculateFn,
})
