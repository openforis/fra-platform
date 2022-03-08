import { ChangeEventHandler, ClipboardEventHandler } from 'react'
import { useDispatch } from 'react-redux'

import { Col, Row, Table, NodeValue } from '@meta/assessment'
import { useCountryIso } from '@client/hooks'
// import { Functions } from '@core/utils'
import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'

import { Sanitizer } from './sanitizer'

type Props = {
  table: Table
  row: Row
  col: Col
  nodeValue: NodeValue
}

type UseOnChange = {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
}

export default (props: Props): UseOnChange => {
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const {
    props: { name: assessmentName },
  } = useAssessment()
  const cycle = useCycle()
  const {
    props: { name: sectionName },
  } = useAssessmentSection()

  const { table, col, row, nodeValue } = props
  // const { name: tableName, updateTableDataCell } = table
  // const { index, options, colType } = col.props
  // const colIdx = index as number

  const _persistSanitizedValue = (value: string) => {
    // if (Sanitizer.isAcceptable(colType, value)) {
    const valueUpdate = Sanitizer.sanitize({ value })

    dispatch(
      AssessmentSectionActions.updateNodeValue({
        assessmentName,
        countryIso,
        colName: col.props.colName,
        cycleName: cycle.name,
        sectionName,
        tableName: table.props.name,
        variableName: row.props.variableName,
        value: { ...nodeValue, raw: valueUpdate },
      })
    )
  }

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    const { value } = event.target
    _persistSanitizedValue(value)
  }

  // const onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
  //   event.stopPropagation()
  //   event.preventDefault()

  //   const { clipboardData } = event
  //   const el = document.createElement('html')
  //   el.innerHTML = clipboardData.getData('text/html')

  //   const rows = el.getElementsByTagName('tr')
  //   const rowSpecs = table.rows

  //   if (rows.length > 0) {
  //     let dataUpdate = data.slice()

  //     for (let i = 0; i < rows.length; i += 1) {
  //       const rowIdxCurrent = i + rowIndex
  //       const rowSpec = rowSpecs[rowIdxCurrent]
  //       if (!rowSpec) break

  //       const columns = rows[i].getElementsByTagName('td')
  //       for (let j = 0; j < columns.length; j += 1) {
  //         const colIdxCurrent = Number(colIdx) + j
  //         const colSpec = rowSpec.cols.find((col) => col.idx === colIdxCurrent)
  //         if (!colSpec) break

  //         const colSpecType = colSpec.colType
  //         let valueUpdate = columns[j].innerText
  //         const readOnly = [TypeSpec.calculated, TypeSpec.header, TypeSpec.placeholder].includes(colSpecType)

  //         if (!readOnly && Sanitizer.isAcceptable(colSpecType, valueUpdate)) {
  //           valueUpdate = Sanitizer.sanitize(colSpecType, valueUpdate, valuePrev, options)
  //           const params = { state, rowIdx: rowIdxCurrent, colIdx: colIdxCurrent, value: String(valueUpdate) }
  //           dataUpdate = updateTableDataCell(params)(dataUpdate)
  //         }
  //       }
  //     }
  //     dispatch(persistTableData({ assessmentType: assessmentName, sectionName, tableName, data: dataUpdate }))
  //   } else {
  //     const value = clipboardData.getData('text/plain')
  //     _persistSanitizedValue(value)
  //   }
  // }

  // TODO Functions.debounce
  return { onChange, onPaste: () => null }
}
