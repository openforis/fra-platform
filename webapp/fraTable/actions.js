export const tableValueChangedAction = 'fraTable/tableValueChanged'

export const tableValueChanged = (tableSpec, rowIdx, colIdx, newValue) =>
  ({type: tableValueChangedAction, tableSpec, rowIdx, colIdx, newValue})
