import { useEffect, useMemo } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'
import { Objects } from '@utils/objects'

import {
  Assessment,
  AssessmentMetaCache,
  NodeValueValidation,
  NodeValueValidations,
  RowType,
  Table,
} from '@meta/assessment'
import { VariablesByTableCache } from '@meta/assessment/assessmentMetaCache'
import { NodeUpdate, TableDatas } from '@meta/data'
import { ExpressionEvaluator } from '@meta/expressionEvaluator'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { addAppListener } from '@client/store/middleware/listener'
import { AssessmentSectionActions } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'

export const useValidationsAndCalculations = (props: { table: Table }) => {
  const { table } = props
  const assessmentOrig = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const rowsData = useMemo(() => table.rows.filter((row) => row.props.type !== RowType.header), [table.rows])
  const metaCache: AssessmentMetaCache = useMemo(
    () => ({
      calculations: {
        dependants: {},
        dependencies: {},
      },
      validations: {
        dependants: {},
        dependencies: {},
      },
      variablesByTable: Object.entries(
        { ...table.validationDependencies, ...table.calculationDependencies } ?? {}
      ).reduce<VariablesByTableCache>((acc, [_, variables]) => {
        variables.forEach((variable) => {
          // eslint-disable-next-line no-param-reassign
          acc[variable.tableName] = { ...acc[variable.tableName], [variable.variableName]: variable }
        })
        return acc
      }, {}),
    }),
    [table.calculationDependencies, table.validationDependencies]
  )

  const assessment: Assessment = useMemo(
    () => ({ ...assessmentOrig, metaCache: { [cycle.uuid]: metaCache } }),
    [assessmentOrig, cycle.uuid, metaCache]
  )
  useEffect(() => {
    const unsubscribe = dispatch(
      addAppListener({
        matcher: isAnyOf(
          // AssessmentSectionActions.updateNodeValues.fulfilled,
          AssessmentSectionActions.getTableData.fulfilled,
          AssessmentSectionActions.setNodeValues
        ),
        effect: ({ payload }, { getState }) => {
          const state = getState()
          const { data } = state.ui.assessmentSection
          const nodes: Array<NodeUpdate> = []

          rowsData.forEach((row) => {
            const { variableName } = row.props
            const { cols } = row
            cols.forEach((col) => {
              const { colName } = col.props
              if (!colName) return
              const isSelf = Boolean(
                payload?.nodeUpdates?.nodes?.find(
                  (nodeUpdate: NodeUpdate) =>
                    nodeUpdate.colName === colName &&
                    nodeUpdate.tableName === table.props.name &&
                    nodeUpdate.variableName === variableName
                )
              )
              const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]
              let calculateFn: string
              // dont calculate edited node
              if (!isSelf) calculateFn = col.props.calculateFn?.[cycle.uuid] ?? row.props.calculateFn?.[cycle.uuid]

              let validation: NodeValueValidation
              if (validateFns) {
                const validations = validateFns.map((formula) => {
                  return ExpressionEvaluator.evalFormula<NodeValueValidation>({
                    assessment,
                    countryIso,
                    cycle,
                    data,
                    colName,
                    row,
                    formula,
                  })
                })

                validation = NodeValueValidations.merge(validations)
              }

              let nodeValue = TableDatas.getNodeValue({
                data,
                colName,
                countryIso,
                tableName: table.props.name,
                variableName,
              })

              if (calculateFn) {
                const rawResult = ExpressionEvaluator.evalFormula<NodeValueValidation>({
                  assessment,
                  countryIso,
                  cycle,
                  data,
                  colName,
                  row,
                  formula: calculateFn,
                })

                nodeValue = { raw: !Objects.isEmpty(rawResult) ? String(rawResult) : null, calculated: true }
              }

              const value = {
                ...nodeValue,
                validation,
              }

              nodes.push({
                colName,
                tableName: table.props.name,
                variableName,
                value,
              })
            })
          })
          dispatch(
            AssessmentSectionActions.setNodeValidations({
              nodeUpdates: {
                assessment,
                cycle,
                countryIso,
                nodes,
              },
            })
          )
        },
      })
    )
    return unsubscribe
  }, [cycle, countryIso, dispatch, rowsData, table.props.name, assessment])
}
