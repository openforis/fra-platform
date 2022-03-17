import { ChangeEventHandler, ClipboardEventHandler } from 'react'
import { useDispatch } from 'react-redux'

import { Col, ColType, NodeValue, Row, RowType, Table } from '@meta/assessment'
import { useCountryIso } from '@client/hooks'
import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'

import { TableData } from '@meta/data'
import { Objects } from '@core/utils'
import { Sanitizer } from './sanitizer'

type Props = {
  table: Table
  row: Row
  col: Col
  nodeValue: NodeValue
  data: TableData
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

  const { table, col, row, nodeValue, data } = props
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

  const onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { clipboardData } = event
    const el = document.createElement('html')
    el.innerHTML = clipboardData.getData('text/html')

    const rows = el.getElementsByTagName('tr')
    const rowSpecs = table.rows.filter((row) => row.props.type !== RowType.header)

    const updatedData = Objects.cloneDeep(data)

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i += 1) {
        const rowIdxCurrent = i + Number(row.props.index)
        const rowSpec = rowSpecs[rowIdxCurrent]
        if (!rowSpec) break

        const columns = rows[i].getElementsByTagName('td')
        for (let j = 0; j < columns.length; j += 1) {
          const colIdxCurrent = Number(col.props.index) + j
          const colSpec = rowSpec.cols
            .filter((col) => col.props.colType !== ColType.header)
            .find((col) => col.props.index === colIdxCurrent)
          if (!colSpec) break

          const colSpecType = colSpec.props.colType
          const readOnly = [ColType.calculated, ColType.header /* ColType.placeholder */].includes(colSpecType)

          if (!readOnly /* && Sanitizer.isAcceptable(colSpecType, valueUpdate) */) {
            const valueUpdate = Sanitizer.sanitize({ value: columns[j].innerText })
            //       const params = { state, rowIdx: rowIdxCurrent, colIdx: colIdxCurrent, value: String(valueUpdate) }
            //       dataUpdate = updateTableDataCell(params)(dataUpdate)
            console.log({
              rowSpec,
              colSpec,
              valueUpdate,
            })
            console.log(updatedData[countryIso][table.props.name][col.props.colName][row.props.variableName].raw)
          }
        }
      }
      // // dispatch(persistTableData({ assessmentType: assessmentName, sectionName, tableName, data: dataUpdate }))
    } else {
      const value = clipboardData.getData('text/plain')
      _persistSanitizedValue(value)
    }
  }

  return { onChange, onPaste }
}
