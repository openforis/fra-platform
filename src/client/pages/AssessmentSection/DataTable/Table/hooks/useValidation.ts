import { useEffect, useMemo } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'

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
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useCountryIso } from '@client/hooks'

export const useValidations = (props: { table: Table }) => {
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
      variablesByTable: Object.entries(table.validationDependencies ?? {}).reduce<VariablesByTableCache>(
        (acc, [_, variables]) => {
          variables.forEach((variable) => {
            // eslint-disable-next-line no-param-reassign
            acc[variable.tableName] = { ...acc[variable.tableName], [variable.variableName]: variable }
          })
          return acc
        },
        {}
      ),
    }),
    [table.validationDependencies]
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
        effect: (_, { getState }) => {
          const state = getState()
          const { data } = state.pages.assessmentSection
          const nodes: Array<NodeUpdate> = []

          rowsData.forEach((row) => {
            const { variableName } = row.props
            const { cols } = row
            cols.forEach((col) => {
              const { colName } = col.props
              if (!colName) return
              const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]
              if (!validateFns) return

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
              const validation = NodeValueValidations.merge(validations)
              const value = {
                ...TableDatas.getNodeValue({
                  data,
                  colName,
                  countryIso,
                  tableName: table.props.name,
                  variableName,
                }),
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
