import { useDispatch, useSelector } from 'react-redux'

import { TableSpec, RowSpec, ColSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { persistTableData } from '../../../../actions'
import * as Sanitizer from './sanitizer'

export default (props) => {
  const { assessmentType, sectionName, tableSpec, rowIdx, col, datum: valuePrev } = props
  const tableName = TableSpec.getName(tableSpec)
  const updateTableDataCell = TableSpec.getUpdateTableDataCell(tableSpec)

  const type = ColSpec.getType(col)
  const colIdx = ColSpec.getIdx(col)
  const options = ColSpec.getOptions(col)

  const dispatch = useDispatch()
  const state = useSelector((_state) => _state)
  const data = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)

  const _persistSanitizedValue = (value) => {
    if (Sanitizer.isAcceptable(type, value)) {
      const valueUpdate = Sanitizer.sanitize(type, value, valuePrev, options)
      const dataUpdate = updateTableDataCell({ state, rowIdx, colIdx, value: valueUpdate })(data)
      dispatch(persistTableData({ assessmentType, sectionName, tableName, data: dataUpdate }))
    }
  }

  const onChange = (event) => {
    const { value } = event.target
    _persistSanitizedValue(value)
  }

  const onPaste = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { clipboardData } = event
    const el = document.createElement('html')
    el.innerHTML = clipboardData.getData('text/html')

    const rows = el.getElementsByTagName('tr')
    const rowSpecs = TableSpec.getRowsData(tableSpec)

    if (rows.length > 0) {
      let dataUpdate = data.slice()

      for (let i = 0; i < rows.length; i += 1) {
        const rowIdxCurrent = i + rowIdx
        const rowSpec = rowSpecs[rowIdxCurrent]
        if (!rowSpec) break

        const row = rows[i]
        const columns = row.getElementsByTagName('td')
        for (let j = 0; j < columns.length; j += 1) {
          const colIdxCurrent = j + colIdx
          const colSpec = RowSpec.getColByIdx(colIdxCurrent)(rowSpec)
          if (!colSpec) break

          const colSpecType = ColSpec.getType(colSpec)
          let valueUpdate = columns[j].innerText

          if (!ColSpec.isReadOnly(colSpec) && Sanitizer.isAcceptable(colSpecType, valueUpdate)) {
            valueUpdate = Sanitizer.sanitize(colSpecType, valueUpdate, valuePrev, options)
            const params = { state, rowIdx: rowIdxCurrent, colIdx: colIdxCurrent, value: valueUpdate }
            dataUpdate = updateTableDataCell(params)(dataUpdate)
          }
        }
      }
      dispatch(persistTableData({ assessmentType, sectionName, tableName, data: dataUpdate }))
    } else {
      const value = clipboardData.getData('text/plain')
      _persistSanitizedValue(value)
    }
  }

  return { onChange, onPaste }
}
