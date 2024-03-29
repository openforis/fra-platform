import React, { ClipboardEventHandler } from 'react'

import { NodesBodyValue } from 'meta/api/request'
import { Col, Cols, ColType, NodeValue, Row, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { DataActions } from 'client/store/data'
import { useSection } from 'client/store/metadata'
import { useCountryIso } from 'client/hooks'
import { Sanitizer } from 'client/utils/sanitizer'

type Props = {
  table: Table
  row: Row
  col: Col
  nodeValue: NodeValue
  data: RecordAssessmentData
  sectionName: string
}

export type OnChangeNodeValue = (value: NodeValue) => void
export type OnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
export type OnPaste = React.ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

type Returned = {
  onChange: OnChange
  onChangeNodeValue: OnChangeNodeValue
  onPaste: OnPaste
}

export default (props: Props): Returned => {
  const { table, col, row, nodeValue: _nodeValue, data, sectionName } = props
  const type = col.props.colType

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const assessment = useAssessment()
  const assessmentSection = useSection(sectionName)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { calculated, estimated, estimationUuid, validation, ...nodeValue } = _nodeValue ?? ({} as NodeValue)

  const _persistSanitizedValue = (value: NodeValue) => {
    if (Sanitizer.isAcceptable({ type, value: value.raw })) {
      const valueUpdate = Sanitizer.sanitize({
        value: value.raw,
        type,
        valuePrev: nodeValue.raw,
        options: col.props.select?.options,
      })

      dispatch(
        DataActions.updateNodeValues({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          sectionName: assessmentSection.props.name,
          countryIso,
          tableName: table.props.name,
          values: [
            {
              colName: col.props.colName,
              value: { ...nodeValue, raw: valueUpdate },
              variableName: row.props.variableName,
            },
          ],
        })
      )
    }
  }

  const onChangeNodeValue = (value: NodeValue): void => {
    _persistSanitizedValue(value)
  }

  const onChange: OnChange = (event): void => {
    const { value } = event.target
    onChangeNodeValue({
      ...nodeValue,
      raw: value,
    })
  }

  const onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { clipboardData } = event
    const el = document.createElement('html')
    el.innerHTML = clipboardData.getData('text/html')
    const rowsToPaste = el.getElementsByTagName('tr')

    if (rowsToPaste.length > 0) {
      const rowIndexProp = Number(row.props.index)
      const colIndexProp = Number(col.props.index)

      const initialRowIndex = table.rows.findIndex((row) => row.props.index === rowIndexProp)
      const initialColIndex = table.rows[initialRowIndex].cols.findIndex((col) => col.props.index === colIndexProp)

      const colIndexes = table.rows[initialRowIndex].cols
        .slice(initialColIndex)
        .filter((col) => ![ColType.calculated, ColType.header].includes(col.props.colType))
        .map((col) => col.props.index)

      const values: Array<NodesBodyValue> = []

      for (let i = 0; i < rowsToPaste.length; i += 1) {
        const rowSpec = table.rows[initialRowIndex + i]

        if (!rowSpec || [RowType.calculated, RowType.header, RowType.noticeMessage].includes(rowSpec.props.type)) break

        const columnsToPaste = rowsToPaste[i].getElementsByTagName('td')

        for (let j = 0; j < columnsToPaste.length; j += 1) {
          const colSpec = rowSpec.cols.find((col) => col.props.index === colIndexes[j])

          if (!colSpec) break

          const colSpecType = colSpec.props.colType
          const value = columnsToPaste[j].innerText
          const readOnly = Cols.isReadOnly({ cycle, col: colSpec, row: rowSpec }) || nodeValue.odp
          const acceptable = Sanitizer.isAcceptable({ type: colSpecType, value })

          if (!readOnly && acceptable) {
            const nodeValue = RecordAssessmentDatas.getNodeValue({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data,
              countryIso,
              colName: colSpec.props.colName,
              variableName: rowSpec.props.variableName,
              tableName: table.props.name,
            })
            const valueUpdate = Sanitizer.sanitize({
              value,
              type: colSpecType,
              valuePrev: nodeValue.raw,
              options: colSpec.props.select?.options,
            })
            const nodeValueUpdate = { raw: valueUpdate }

            const item = {
              value: nodeValueUpdate,
              variableName: rowSpec.props.variableName,
              colName: colSpec.props.colName,
            }
            values.push(item)
            // updatedData = TableDatas.updateDatum({
            //   data: updatedData,
            //   countryIso,
            //   tableName: table.props.name,
            //   ...item,
            // })
          }
        }
      }

      if (values.length > 0) {
        dispatch(
          DataActions.updateNodeValues({
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
      let value = clipboardData.getData('text/plain')
      // @ts-ignore
      if (event.target?.selectionStart >= 0) {
        // @ts-ignore
        const { selectionStart, selectionEnd, value: targetValue } = event.target
        value = `${targetValue.slice(0, selectionStart)}${value}${targetValue.slice(selectionEnd)}`
      }
      _persistSanitizedValue({ ...nodeValue, raw: value })
    }
  }

  return { onChange, onChangeNodeValue, onPaste }
}
