import { useCallback } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { NodeValue } from 'meta/assessment/node'
import { RowCache } from 'meta/assessment/rowCache'
import { RecordAssessmentDatas } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/routeParams'

import { Props } from './types'

type Returned = (value: NodeValue) => Array<VariableCache>

const useAffectedNodes = (props: Props): Returned => {
  const { col, data, row, table } = props

  const { countryIso } = useCountryRouteParams<CountryIso>()
  const assessment = useAssessment()
  const cycle = useCycle()

  return useCallback(
    (value: NodeValue): Array<VariableCache> => {
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
          sectionName: props.sectionName,
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

        return !enabled && !!depValue && !!depValue.raw
      })
    },
    [assessment, col, countryIso, cycle, data, props.sectionName, row, table]
  )
}

export default useAffectedNodes
