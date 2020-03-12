// ===== Section
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const descriptionsDefault = {
  introductoryText: false,
  nationalData: true,
  analysisAndProcessing: true,
  comments: true,
}

export const newSectionSpec = (sectionName = '', sectionAnchor = '', tableSections = [], descriptions = {}) => ({
  sectionName,
  sectionAnchor,
  tableSections: tableSections.map((s, idx) => ({ idx, ...s })),
  descriptions: { ...descriptionsDefault, ...descriptions },
})

// ===== Table section

export const newTableSection = (tableSpecs = [], titleKey, descriptionKey) => ({
  tableSpecs,
  titleKey,
  descriptionKey,
})

// ===== Table

export const newTableSpec = (name, rows, getSectionData = AssessmentState.getSectionData, odp = false) => {
  let idxHeader = -1
  let idxData = -1
  return {
    name,
    odp,
    getSectionData,
    rows: rows.map(row => {
      const header = row.type === 'header'
      idxHeader += header ? 1 : 0
      idxData += header ? 0 : 1
      return {
        idx: header ? `header_${idxHeader}` : idxData,
        ...row,
      }
    }),
  }
}

export const newRowHeader = cols => ({
  type: 'header',
  cols: cols.map((col, idx) => ({ idx, ...col })),
})

export const newRowData = (
  labelKey,
  cols,
  variableNo = null,
  linkToSection = null,
  validator = null,
  variableName = null,
  calculateFn = null
) => ({
  type: 'data',
  validator,
  variableName,
  calculateFn,
  cols: [
    {
      idx: `header_0`,
      type: 'header',
      labelKey,
      variableNo,
      linkToSection,
      className: calculateFn ? 'fra-table__header-cell-left' : 'fra-table__category-cell',
    },
    ...cols.map((col, idx) => ({ idx, ...col })),
  ],
})

export const newRowNoticeMessage = (labelKey, rowSpan = 1, colSpan = 1) => ({
  type: 'noticeMessage',
  cols: [
    {
      labelKey,
      rowSpan,
      colSpan,
    },
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
