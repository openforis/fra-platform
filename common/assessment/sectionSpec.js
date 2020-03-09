// ===== Section
const descriptionsDefault = {
  introductoryText: false,
  nationalData: true,
  analysisAndProcessing: true,
  comments: true,
}

const newSectionSpec = (sectionName = '', sectionAnchor = '', tableSections = [], descriptionKey = '', descriptions = {}) => ({
  sectionName,
  sectionAnchor,
  descriptionKey,
  tableSections,
  descriptions: { ...descriptionsDefault, ...descriptions },
})

// ===== Table section

const newTableSection = (titleKey = '', descriptionKey = '', tableSpecs = []) => ({
  titleKey,
  descriptionKey,
  tableSpecs,
})

// ===== Table

const newTableSpec = rows => ({ rows })

const newRowData = (labelKey, cols, variableNo = null) => ({
  type: 'data',
  cols: [
    {
      type: 'header', labelKey, variableNo, className: 'fra-table__category-cell'
    },
    ...cols
  ]
})

const newColDecimal = () => ({
  type: 'datum',
  dataType: 'decimal'
})

module.exports = {
  newSectionSpec,
  newTableSection,
  newTableSpec,
  newRowData,
  newColDecimal,
}
