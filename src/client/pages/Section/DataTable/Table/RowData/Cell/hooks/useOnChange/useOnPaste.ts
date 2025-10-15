import { useCallback } from 'react'

import { NodesBodyValue } from 'meta/api/request'
import { ColType } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { NodeValue } from 'meta/assessment/node'
import { RowType } from 'meta/assessment/row'
import { RecordAssessmentDatas } from 'meta/data'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useCountryIso } from 'client/hooks/country'
import { Sanitizer } from 'client/utils/sanitizer'

import { OnPaste, Props } from './types'
import { usePersistSanitizedValue } from './usePersistSanitizedValue'

export const useOnPaste = (props: Props) => {
  const { col, data, nodeValue: _nodeValue, row, sectionName, table } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const assessment = useAssessment()
  const assessmentSection = useSection(sectionName)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { calculated, estimated, estimationUuid, validation, ...nodeValue } = _nodeValue ?? ({} as NodeValue)

  const persistSanitizedValue = usePersistSanitizedValue(props)

  useCallback<OnPaste>(
    (event) => {
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

          if (!rowSpec || [RowType.calculated, RowType.header, RowType.noticeMessage].includes(rowSpec.props.type))
            break

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
                options: Cols.getSelectOptions({ cycle, col: colSpec }),
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
            NodeValuesActions.updateNodeValues({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              sectionName: assessmentSection?.props.name,
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
          const { selectionEnd, selectionStart, value: targetValue } = event.target
          value = `${targetValue.slice(0, selectionStart)}${value}${targetValue.slice(selectionEnd)}`
        }
        persistSanitizedValue({ ...nodeValue, raw: value })
      }
    },
    [
      assessment.props.name,
      assessmentSection?.props.name,
      col.props.index,
      countryIso,
      cycle,
      data,
      dispatch,
      nodeValue,
      persistSanitizedValue,
      row.props.index,
      table.props.name,
      table.rows,
    ]
  )
}
