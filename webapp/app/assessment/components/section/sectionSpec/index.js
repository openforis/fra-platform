import * as TableSpec from './tableSpec'
import * as RowSpec from './rowSpec'
import * as ColSpec from './colSpec'

export { TableSpec }
export { RowSpec }
export { ColSpec }

export { TYPES, TYPE, isData, isNotData, isHeader, isNotHeader, isDecimal, isText } from './keysType'

export { KEYS_SECTION, KEYS_SECTION_DESCRIPTIONS, newSectionSpec } from './sectionSpec'

export { KEYS_TABLE_SECTION, newTableSection } from './tableSectionSpec'

export { KEYS_TABLE, KEYS_TABLE_DATA_REQUIRED, KEYS_TABLE_PRINT, newTableSpec } from './tableSpec'

export {
  KEYS_ROW,
  KEYS_ROW_CHART,
  newRowHeader,
  newRowData,
  newRowValidationMessages,
  newRowNoticeMessage,
} from './rowSpec'

export {
  KEYS_COL,
  newColCalculated,
  newColHeader,
  newColDecimal,
  newColInteger,
  newColText,
  newColTextArea,
  newColSelect,
  newColSelectYesNo,
  newColPlaceholder,
} from './colSpec'
