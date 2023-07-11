import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Col, NodeValueValidation, NodeValueValidations, Row, Table } from 'meta/assessment'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { DataActions, useNodeValueValidation, useRecordAssessmentData } from 'client/store/data'
import { useCountryIso } from 'client/hooks'

type Props = {
  canEditData: boolean
  col: Col
  row: Row
  table: Table
}

export const useValidateNode = (props: Props): NodeValueValidation => {
  const { canEditData, col, row, table } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const data = useRecordAssessmentData()

  useEffect(() => {
    const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]

    let nodeValueValidation: NodeValueValidation = { valid: true }

    if (canEditData && validateFns?.length) {
      const validations = validateFns.map((formula) => {
        return ExpressionEvaluator.evalFormula<NodeValueValidation>({
          assessment,
          countryIso,
          cycle,
          data,
          colName: col.props.colName,
          row,
          formula,
          t,
        })
      })
      nodeValueValidation = NodeValueValidations.merge(validations)
    }

    dispatch(
      DataActions.setNodeValueValidation({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        table,
        row,
        col,
        nodeValueValidation,
      })
    )
  }, [assessment, canEditData, col, countryIso, cycle, data, dispatch, row, t, table])

  return useNodeValueValidation({ table, row, col })
}
