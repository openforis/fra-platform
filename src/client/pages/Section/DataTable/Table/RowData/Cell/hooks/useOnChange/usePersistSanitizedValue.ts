import { useCallback } from 'react'

import { Objects } from 'utils/objects'

import { ColType } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { NodeValue } from 'meta/assessment/node'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useCountryIso } from 'client/hooks/country'
import { Sanitizer } from 'client/utils/sanitizer'

import { Props } from './types'

export const usePersistSanitizedValue = (props: Props) => {
  const { col, nodeValue: _nodeValue, row, sectionName, table } = props
  const type = col.props.colType

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const assessment = useAssessment()
  const assessmentSection = useSection(sectionName)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { calculated, estimated, estimationUuid, validation, ...nodeValue } = _nodeValue ?? ({} as NodeValue)

  return useCallback(
    (value: NodeValue) => {
      if (Sanitizer.isAcceptable({ type, value: value.raw })) {
        const valueUpdate = Sanitizer.sanitize({
          value: value.raw,
          type,
          valuePrev: nodeValue.raw,
          options: Cols.getSelectOptions({ cycle, col }),
        })
        const nodeValueUpdate = { ...nodeValue, raw: valueUpdate }

        if (type === ColType.taxon) {
          if (Objects.isEmpty(value.taxonCode)) {
            delete nodeValueUpdate.taxonCode
          } else {
            nodeValueUpdate.taxonCode = value.taxonCode
          }
        }

        dispatch(
          NodeValuesActions.updateNodeValues({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
            sectionName: assessmentSection?.props.name,
            countryIso,
            tableName: table.props.name,
            values: [
              {
                colName: col.props.colName,
                value: nodeValueUpdate,
                variableName: row.props.variableName,
              },
            ],
          })
        )
      }
    },
    [
      assessment.props.name,
      assessmentSection?.props.name,
      col,
      countryIso,
      cycle,
      dispatch,
      nodeValue,
      row.props.variableName,
      table.props.name,
      type,
    ]
  )
}
