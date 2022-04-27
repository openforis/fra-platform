import { ChangeEventHandler, ClipboardEventHandler } from 'react'
import { useDispatch } from 'react-redux'

import { Objects } from '@core/utils'

import { Col, Cols, ColType, NodeValue, Row, RowType, Table } from '@meta/assessment'
import { TableData, TableDatas } from '@meta/data'

import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { ValueUpdate } from '@client/store/pages/assessmentSection/actions/updateNodeValues'
import { useCountryIso } from '@client/hooks'
import { Sanitizer } from '@client/utils/sanitizer'

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
  const cycle = useCycle()
  const assessment = useAssessment()
  const assessmentSection = useAssessmentSection()

  const { table, col, row, nodeValue, data } = props

  const _persistSanitizedValue = (value: string) => {
    const type = col.props.colType
    if (Sanitizer.isAcceptable({ type, value })) {
      const valueUpdate = Sanitizer.sanitize({ value, type, valuePrev: nodeValue.raw })

      dispatch(
        AssessmentSectionActions.updateNodeValue({
          assessmentName: assessment.props.name,
          countryIso,
          colName: col.props.colName,
          cycleName: cycle.name,
          sectionName: assessmentSection.props.name,
          tableName: table.props.name,
          variableName: row.props.variableName,
          value: { ...nodeValue, raw: valueUpdate },
        })
      )
    }
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

    let updatedData = Objects.cloneDeep(data)

    const values: Array<ValueUpdate> = []
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
          const value = columns[j].innerText
          const readOnly = Cols.isReadOnly({ col: colSpec, row: rowSpec }) || nodeValue.odp
          const acceptable = Sanitizer.isAcceptable({ type: colSpecType, value })

          if (!readOnly && acceptable) {
            const nodeValue = TableDatas.getNodeValue({ data: updatedData, countryIso, col, row, table })
            const valueUpdate = Sanitizer.sanitize({ value, type: colSpecType, valuePrev: nodeValue.raw })
            const nodeValueUpdate = { raw: valueUpdate }
            //       const params = { state, rowIdx: rowIdxCurrent, colIdx: colIdxCurrent, value: String(valueUpdate) }
            //       dataUpdate = updateTableDataCell(params)(dataUpdate)
            // console.log({
            //   rowSpec,
            //   colSpec,
            //   valueUpdate,
            // })
            values.push({
              value: nodeValueUpdate,
              variableName: rowSpec.props.variableName,
              colName: colSpec.props.colName,
            })
            // console.log(updatedData[countryIso][table.props.name][col.props.colName][row.props.variableName].raw)
            updatedData = TableDatas.updateDatum({
              data: updatedData,
              countryIso,
              value: nodeValueUpdate,
              variableName: rowSpec.props.variableName,
              tableName: table.props.name,
              colName: colSpec.props.colName,
            })
          }
        }
      }
      // console.log(updatedData)
      // console.log(valueUpdates)
      if (values.length > 0) {
        dispatch(
          AssessmentSectionActions.updateNodeValues({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
            sectionName: assessmentSection.props.name,
            countryIso,
            tableName: table.props.name,
            values,
          })
        )
      }
    } else {
      const value = clipboardData.getData('text/plain')
      _persistSanitizedValue(value)
    }
  }

  return { onChange, onPaste }
}
