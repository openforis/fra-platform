import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { NodeValueValidation, NodeValueValidations, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { validatorEqualToPreviousCycleForestArea } from 'meta/expressionEvaluator/functions/validatorEqualToPreviousCycleForestArea'
import { Authorizer } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment, useAssessmentSection, useCountry, useCycle } from 'client/store/assessment'
import { DataActions, RecordTableValidationsState } from 'client/store/data'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import { useRowsData } from './useRowsData'

type Props = {
  data: RecordAssessmentData
  sectionName: string
  table: Table
}

export const useValidate = (props: Props): void => {
  const { data, sectionName, table } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const rowsData = useRowsData({ table })

  const canEditData = Authorizer.canEditData({ country, cycle, section, user })

  useEffect(() => {
    const tableValidations: RecordTableValidationsState = { [table.props.name]: {} }

    if (canEditData) {
      rowsData.forEach((row) => {
        row.cols.forEach((col) => {
          const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]
          if (validateFns?.length) {
            const validations = validateFns.map((formula) => {
              // hack to disable validatorEqualToPreviousCycleForestArea for Atlantis countries as explicitly requested.
              // This is the only way, unfortunately. We'll get back to this later on.
              if (Areas.isAtlantis(countryIso) && formula.includes(validatorEqualToPreviousCycleForestArea.name)) {
                return { valid: true }
              }

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

            Objects.setInPath({
              obj: tableValidations,
              path: [table.props.name, col.props.colName, row.props.variableName],
              value: NodeValueValidations.merge(validations),
            })
          }
        })
      })
    }

    dispatch(
      DataActions.setNodeValueValidations({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        tableValidations,
      })
    )
  }, [assessment, canEditData, countryIso, cycle, data, dispatch, rowsData, t, table.props.name])
}
