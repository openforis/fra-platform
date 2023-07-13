import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidations, RowType, Table } from 'meta/assessment'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { Authorizer } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment, useAssessmentSection, useCountry, useCycle } from 'client/store/assessment'
import { DataActions, RecordTableValidationsState, useRecordAssessmentData } from 'client/store/data'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

type Props = {
  sectionName: string
  table: Table
}

export const useValidateNodes = (props: Props): void => {
  const { sectionName, table } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const data = useRecordAssessmentData()

  const rowsData = useMemo(() => table.rows.filter((row) => row.props.type !== RowType.header), [table.rows])
  const canEditData = Authorizer.canEditData({ country, cycle, section, user })

  useEffect(() => {
    const tableValidations: RecordTableValidationsState = { [table.props.name]: {} }

    if (canEditData) {
      rowsData.forEach((row) => {
        row.cols.forEach((col) => {
          const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]
          if (validateFns?.length) {
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
