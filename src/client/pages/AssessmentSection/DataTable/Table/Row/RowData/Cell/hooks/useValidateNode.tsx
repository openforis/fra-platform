import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Col, NodeValueValidation, NodeValueValidations, Row } from 'meta/assessment'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useRecordAssessmentData } from 'client/store/data'
import { useCountryIso } from 'client/hooks'

export const useValidateNode = (props: { canEditData: boolean; col: Col; row: Row }): NodeValueValidation => {
  const { canEditData, col, row } = props

  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const data = useRecordAssessmentData()

  const [validation, setValidation] = useState<NodeValueValidation>({ valid: true })

  useEffect(() => {
    const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]

    setValidation(() => {
      if (!canEditData || !validateFns) {
        return { valid: true }
      }

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
      return NodeValueValidations.merge(validations)
    })
  }, [assessment, canEditData, col.props.colName, col.props.validateFns, countryIso, cycle, data, row, t])

  return validation
}
