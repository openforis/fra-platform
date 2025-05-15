import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { NodeValue } from 'meta/assessment/node'
import { RowCache } from 'meta/assessment/rowCache'
import { RecordAssessmentDatas } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { DataActions } from 'client/store/data'
import { useSection } from 'client/store/metadata'
import { useCountryIso } from 'client/hooks'

import { OnChangeNodeValue, Props } from './types'
import { usePersistSanitizedValue } from './usePersistSanitizedValue'

const getAffectedNodes = (
  props: Props & {
    assessment: Assessment
    cycle: Cycle
    countryIso: CountryIso
    value: NodeValue
  }
): Array<VariableCache> => {
  const { assessment, col, countryIso, cycle, data, row, sectionName, table, value } = props

  const tableName = table.props.name
  const { variableName } = row.props
  const { colName } = col.props

  // Future data contains the updated value and is used to evaluate the enablers
  const futureData = RecordAssessmentDatas.updateDatum({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    countryIso,
    tableName,
    colName,
    variableName,
    data: Objects.cloneDeep(data),
    value,
  })

  const enablerDependants = AssessmentMetaCaches.getEnablersDependants({
    assessment,
    cycle,
    tableName,
    variableName,
  })

  return enablerDependants.filter((dep) => {
    const depRow = table.rows?.find((r) => r.props.variableName === dep.variableName)
    const depCol = depRow?.cols?.find((c) => c.props.colName === dep.colName)
    if (!depRow || !depCol) return false
    const enableIf = depCol.props.enableIf?.[cycle.uuid]
    if (!enableIf) return false

    const rowCache: RowCache = {
      ...depRow,
      tableName,
      sectionName,
    }

    const enabled = ExpressionEvaluator.evalFormula<boolean>({
      assessment,
      assessments: { [assessment.props.name]: assessment },
      countryIso,
      cycle,
      data: futureData,
      colName: depCol.props.colName,
      row: rowCache,
      formula: enableIf,
    })

    const depValue = RecordAssessmentDatas.getNodeValue({
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      data,
      countryIso,
      tableName,
      colName: depCol.props.colName,
      variableName: depRow.props.variableName,
    })

    return !enabled && depValue && depValue.raw
  })
}

export const useOnChangeNodeValue = (props: Props) => {
  const { col, row, sectionName, table } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const assessment = useAssessment()
  const assessmentSection = useSection(sectionName)

  const { t } = useTranslation()
  const persistSanitizedValue = usePersistSanitizedValue(props)

  return useCallback<OnChangeNodeValue>(
    (value: NodeValue): void => {
      const tableName = table.props.name
      const { variableName } = row.props
      const { colName } = col.props

      const affected = getAffectedNodes({ ...props, assessment, countryIso, cycle, value })

      // If node change affects other row x cols:
      if (affected.length > 0) {
        const fields = affected.map((a) => t(`measures.${a.variableName}`)).join('\n')

        const confirmed = window.confirm(t('common.areYouSureFollowingFieldsWillBeDisabled', { fields }))

        // Do nothing if the user cancels the confirmation
        if (!confirmed) return

        const updates = [
          {
            colName,
            value,
            variableName,
          },
          ...affected.map((a) => ({
            colName: a.colName,
            value: { raw: null } as NodeValue,
            variableName: a.variableName,
          })),
        ]

        dispatch(
          DataActions.updateNodeValues({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
            sectionName: assessmentSection?.props.name,
            countryIso,
            tableName,
            values: updates,
          })
        )
        return
      }

      persistSanitizedValue(value)
    },
    [
      assessment,
      assessmentSection?.props.name,
      col.props,
      countryIso,
      cycle,
      dispatch,
      persistSanitizedValue,
      props,
      row.props,
      t,
      table.props.name,
    ]
  )
}
