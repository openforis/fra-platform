import { useDispatch, useSelector } from 'react-redux'

import { TableSpec, ColSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { persistTableData } from '../../../../actions'
import * as Sanitizer from '../cell/sanitizer'

export default (props) => {
  const { assessmentType, sectionName, tableSpec, variableName, datum } = props
  const tableName = TableSpec.getName(tableSpec)
  const updateTableDataCell = TableSpec.getUpdateTableDataCell(tableSpec)
  const type = ColSpec.TYPES.decimal

  const dispatch = useDispatch()
  const state = useSelector((_state) => _state)
  const data = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)

  const _persistSanitizedValue = (value) => {
    if (Sanitizer.isAcceptable(type, value)) {
      const valuePrev = datum[variableName]
      const valueSanitized = Sanitizer.sanitize(type, value, valuePrev)
      const valueUpdate = valueSanitized && String(valueSanitized)
      const datumUpdate = { ...datum, [variableName]: valueUpdate, [`${variableName}Estimated`]: false }
      const dataUpdate = updateTableDataCell({ state, variableName, datum: datumUpdate })(data)
      dispatch(persistTableData({ assessmentType, sectionName, tableName, data: dataUpdate, datum: datumUpdate }))
    }
  }

  const onChange = (event) => {
    const { value } = event.target
    _persistSanitizedValue(value)
  }

  // const onPaste = (event) => {
  //   event.stopPropagation()
  //   event.preventDefault()
  //
  //   const { clipboardData } = event
  //   const el = document.createElement('html')
  //   el.innerHTML = clipboardData.getData('text/html')
  //
  //   const rows = el.getElementsByTagName('tr')
  //   const tableSpec = SectionSpecs.getTableSpec(assessmentType, sectionName, tableName)
  //   const rowSpecs = TableSpec.getRowsData(tableSpec)
  //
  //   if (rows.length > 0) {
  //     let dataUpdate = data.slice()
  //
  //     for (let i = 0; i < rows.length; i += 1) {
  //       const rowIdxCurrent = i + rowIdx
  //       const rowSpec = rowSpecs[rowIdxCurrent]
  //       if (!rowSpec) break
  //
  //       const row = rows[i]
  //       const columns = row.getElementsByTagName('td')
  //       for (let j = 0; j < columns.length; j += 1) {
  //         const colIdxCurrent = j + colIdx
  //         const colSpec = RowSpec.getColByIdx(colIdxCurrent)(rowSpec)
  //         if (!colSpec) break
  //
  //         const colSpecType = ColSpec.getType(colSpec)
  //         let valueUpdate = columns[j].innerText
  //
  //         if (!ColSpec.isReadOnly(colSpec) && Sanitizer.isAcceptable(colSpecType, valueUpdate)) {
  //           valueUpdate = Sanitizer.sanitize(colSpecType, valueUpdate, valuePrev, options)
  //           const params = { state, rowIdx: rowIdxCurrent, colIdx: colIdxCurrent, value: valueUpdate }
  //           dataUpdate = updateTableDataCell(params)(dataUpdate)
  //         }
  //       }
  //     }
  //     dispatch(persistTableData({ assessmentType, sectionName, tableName, data: dataUpdate }))
  //   } else {
  //     const value = clipboardData.getData('text/plain')
  //     _persistSanitizedValue(value)
  //   }
  // }

  return { onChange }
}
