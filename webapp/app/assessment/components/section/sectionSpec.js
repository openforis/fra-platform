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

export const newTableSpec = (
  name,
  rows,
  getSectionData = AssessmentState.getSectionData,
  isSectionDataEmpty = AssessmentState.isSectionDataEmpty,
  odp = false,
  canGenerateValues = null
) => {
  let idxHeader = -1
  let idxData = -1
  return {
    name,
    getSectionData,
    isSectionDataEmpty,
    odp,
    canGenerateValues,
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
  cols = null,
  variableNo = null,
  linkToSection = null,
  validator = null,
  subcategory = false,
  variableName = null,
  calculateFn = null,
  chartProps = null
) => {
  let idxHeader = -1
  let idxData = -1

  let colHeaderClassName = 'fra-table__category-cell'
  colHeaderClassName = calculateFn ? 'fra-table__header-cell-left' : colHeaderClassName
  colHeaderClassName = subcategory ? 'fra-table__subcategory-cell' : colHeaderClassName

  const colHeader = {
    idx: `header_0`,
    type: 'header',
    labelKey,
    variableNo,
    linkToSection,
    className: colHeaderClassName,
  }

  const row = {
    type: 'data',
    validator,
    variableName,
    calculateFn,
    chartProps,
    cols: [
      colHeader,
      ...(cols
        ? cols.map(col => {
            const header = col.type === 'calculated'
            idxHeader += header ? 1 : 0
            idxData += header ? 0 : 1
            return {
              idx: header ? `header_${idxHeader}` : idxData,
              ...col,
            }
          })
        : []),
    ],
  }
  return row
}

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

export const newRowValidationMessages = getValidationMessages => ({
  type: 'validationMessages',
  getValidationMessages,
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
