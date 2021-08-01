import * as UnitSpec from '@core/sectionSpec/unitSpec'
import * as TableSpec from './tableSpec'
import * as RowSpec from './rowSpec'
import * as ColSpec from './colSpec'

export { TableSpec }
export { RowSpec }
export { ColSpec }
export { UnitSpec }

export { TypeSpec, TYPE, isData, isNotData, isHeader, isNotHeader, isDecimal, isText } from '@core/sectionSpec/typeSpec'

export { KEYS_SECTION, KEYS_SECTION_DESCRIPTIONS, KEYS_DATA_EXPORT, newSectionSpec } from './sectionSpec'

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

export { default as VARIABLES } from './variables'
