import React from 'react'

import { NodesBodyValue } from '@meta/api/request'
import { Col, Cols, ColType, NodeValue, Row, RowType, Table } from '@meta/assessment'
import { TableData, TableDatas } from '@meta/data'

import { useAppDispatch } from '@client/store'
import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useCountryIso } from '@client/hooks'
import { Sanitizer } from '@client/utils/sanitizer'

type Props = {
  table: Table
  row: Row
  col: Col
  nodeValue: NodeValue
  data: TableData
  sectionName: string
}
export type OnChangeNodeValue = (value: NodeValue) => void
export type OnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
export type OnPaste = React.ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

type UseOnChange = {
  onChange: OnChange
  onChangeNodeValue: OnChangeNodeValue
  onPaste: OnPaste
}

export default (props: Props): UseOnChange => {
  const { table, col, row, nodeValue, data, sectionName } = props
  const type = col.props.colType

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const assessment = useAssessment()
  const assessmentSection = useAssessmentSection(sectionName)

  const _persistSanitizedValue = (value: NodeValue) => {
    if (Sanitizer.isAcceptable({ type, value: value.raw })) {
      const valueUpdate = Sanitizer.sanitize({
        value: value.raw,
        type,
        valuePrev: nodeValue.raw,
        options: col.props.select?.options,
      })

      dispatch(
        AssessmentSectionActions.updateNodeValues({
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

  const onPaste: React.ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { clipboardData } = event
    const el = document.createElement('html')
    el.innerHTML = clipboardData.getData('text/html')

    const rows = el.getElementsByTagName('tr')
    const rowSpecs = table.rows.filter((row) => row.props.type !== RowType.header)

    if (rows.length > 0) {
      const values: Array<NodesBodyValue> = []
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
            const nodeValue = TableDatas.getNodeValue({
              data,
              countryIso,
              colName: col.props.colName,
              variableName: row.props.variableName,
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
      _persistSanitizedValue({
        ...nodeValue,
        raw: value,
      })
    }
  }

  return { onChange, onChangeNodeValue, onPaste }
}
