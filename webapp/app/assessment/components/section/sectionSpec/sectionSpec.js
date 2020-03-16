import * as R from 'ramda'

export const KEYS_SECTION = {
  sectionName: 'sectionName',
  sectionAnchor: 'sectionAnchor',
  tableSections: 'tableSections',
  descriptions: 'descriptions',
}

export const KEYS_SECTION_DESCRIPTIONS = {
  introductoryText: 'introductoryText',
  nationalData: 'nationalData',
  analysisAndProcessing: 'analysisAndProcessing',
  comments: 'comments',
}

const sectionSpecDefault = {
  [KEYS_SECTION.sectionName]: '',
  [KEYS_SECTION.sectionAnchor]: '',
  [KEYS_SECTION.tableSections]: [],
  [KEYS_SECTION.descriptions]: {
    [KEYS_SECTION_DESCRIPTIONS.introductoryText]: false,
    [KEYS_SECTION_DESCRIPTIONS.nationalData]: true,
    [KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: true,
    [KEYS_SECTION_DESCRIPTIONS.comments]: true,
  },
}

const assocTableSections = sectionSpec => {
  const tableSections = sectionSpec[KEYS_SECTION.tableSections].map((tableSection, idx) => ({
    idx,
    ...tableSection,
  }))

  return {
    ...sectionSpec,
    [KEYS_SECTION.tableSections]: tableSections,
  }
}

export const newSectionSpec = R.pipe(R.mergeDeepRight(sectionSpecDefault), assocTableSections)

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
