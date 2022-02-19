// import { ChangeEventHandler, ClipboardEventHandler } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
//
// import { ColSpec, TableSpec, TypeSpec } from '@webapp/sectionSpec'
// import { AssessmentType, TableData } from '@core/assessment'
// import * as AssessmentState from '@webapp/app/assessment/assessmentState'
//
// import { persistTableData } from '../../../../actions'
// import * as Sanitizer from './sanitizer'
//
// type Props = {
//   assessmentType: AssessmentType
//   sectionName: string
//   tableSpec: TableSpec
//   rowIdx: number
//   col: ColSpec
//   datum: string
// }
//
// type UseOnChange = {
//   onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// }
//
// export default (props: Props): UseOnChange => {
//   const { assessmentType, sectionName, tableSpec, rowIdx, col, datum: valuePrev } = props
//   const { name: tableName, updateTableDataCell } = tableSpec
//   const { idx, options, type } = col
//   const colIdx = idx as number
//
//   const dispatch = useDispatch()
//   const state = useSelector((_state) => _state)
//   const data: TableData = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)
//
//   const _persistSanitizedValue = (value: string) => {
//     if (Sanitizer.isAcceptable(type, value)) {
//       const valueUpdate = Sanitizer.sanitize(type, value, valuePrev, options)
//       const dataUpdate = updateTableDataCell({ state, rowIdx, colIdx, value: valueUpdate })(data)
//       dispatch(persistTableData({ assessmentType, sectionName, tableName, data: dataUpdate }))
//     }
//   }
//
//   const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
//     const { value } = event.target
//     _persistSanitizedValue(value)
//   }
//
//   const onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
//     event.stopPropagation()
//     event.preventDefault()
//
//     const { clipboardData } = event
//     const el = document.createElement('html')
//     el.innerHTML = clipboardData.getData('text/html')
//
//     const rows = el.getElementsByTagName('tr')
//     const rowSpecs = tableSpec.rows
//
//     if (rows.length > 0) {
//       let dataUpdate = data.slice()
//
//       for (let i = 0; i < rows.length; i += 1) {
//         const rowIdxCurrent = i + rowIdx
//         const rowSpec = rowSpecs[rowIdxCurrent]
//         if (!rowSpec) break
//
//         const columns = rows[i].getElementsByTagName('td')
//         for (let j = 0; j < columns.length; j += 1) {
//           const colIdxCurrent = Number(colIdx) + j
//           const colSpec = rowSpec.cols.find((col) => col.idx === colIdxCurrent)
//           if (!colSpec) break
//
//           const colSpecType = colSpec.type
//           let valueUpdate = columns[j].innerText
//           const readOnly = [TypeSpec.calculated, TypeSpec.header, TypeSpec.placeholder].includes(colSpecType)
//
//           if (!readOnly && Sanitizer.isAcceptable(colSpecType, valueUpdate)) {
//             valueUpdate = Sanitizer.sanitize(colSpecType, valueUpdate, valuePrev, options)
//             const params = { state, rowIdx: rowIdxCurrent, colIdx: colIdxCurrent, value: String(valueUpdate) }
//             dataUpdate = updateTableDataCell(params)(dataUpdate)
//           }
//         }
//       }
//       dispatch(persistTableData({ assessmentType, sectionName, tableName, data: dataUpdate }))
//     } else {
//       const value = clipboardData.getData('text/plain')
//       _persistSanitizedValue(value)
//     }
//   }
//
//   return { onChange, onPaste }
// }
