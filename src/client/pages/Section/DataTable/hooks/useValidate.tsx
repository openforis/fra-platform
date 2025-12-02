import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { NodeValueValidations } from 'meta/assessment/nodeValueValidations'
import { Table } from 'meta/assessment/table'
import { Authorizer } from 'meta/auth/authorizer'
import { RecordAssessmentData } from 'meta/data/recordData'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { validatorEqualToPreviousCycleForestArea } from 'meta/expressionEvaluator/functions/validatorEqualToPreviousCycleForestArea'
import { Objects } from 'utils/objects'

import { useCountry } from 'client/store/area/hooks/country'
import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { RecordTableValidationsState } from 'client/store/data/tableData/validations/state'
import { useAppDispatch } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryIso } from 'client/hooks/country'
import { useIsPrintRoute } from 'client/hooks/routes'

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
  const section = useSection(sectionName)
  const rowsData = useRowsData({ table })
  const { print } = useIsPrintRoute()

  const canEditData = Authorizer.canEditSectionData({ country, cycle, section, user })

  const { name: tableName } = table.props

  useEffect(() => {
    const tableValidations: RecordTableValidationsState = { [tableName]: {} }

    if (!print && canEditData) {
      const { name: assessmentName } = assessment.props
      const { name: cycleName } = cycle

      rowsData.forEach((row) => {
        const { variableName } = row.props
        row.cols.forEach((col) => {
          const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]

          if (validateFns?.length) {
            const { colName } = col.props
            const validations = validateFns.map((formula) => {
              // hack to disable validatorEqualToPreviousCycleForestArea for Atlantis countries as explicitly requested.
              // This is the only way, unfortunately. We'll get back to this later on.
              if (Areas.isAtlantis(countryIso) && formula.includes(validatorEqualToPreviousCycleForestArea.name)) {
                return { valid: true }
              }

              return ExpressionEvaluator.evalFormula<NodeValueValidation>({
                assessmentName,
                assessments: { [assessmentName]: assessment },
                countryIso,
                cycleName,
                data,
                colName,
                row,
                formula,
                t,
              })
            })

            Objects.setInPath({
              obj: tableValidations,
              path: [tableName, colName, variableName],
              value: NodeValueValidations.merge(validations),
            })
          }
        })
      })

      dispatch(ValidationsActions.setNodeValueValidations({ assessmentName, cycleName, countryIso, tableValidations }))
    }
  }, [assessment, canEditData, countryIso, cycle, data, dispatch, print, rowsData, t, tableName])
}
