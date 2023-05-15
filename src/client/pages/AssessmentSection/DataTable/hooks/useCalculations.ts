import { useEffect, useMemo } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'
import { Objects } from '@utils/objects'

import { AssessmentMetaCaches, NodeValueValidation, RowType, Table, VariableCache } from '@meta/assessment'
import { NodeUpdate, TableDatas } from '@meta/data'
import { ExpressionEvaluator } from '@meta/expressionEvaluator'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { DataActions } from '@client/store/data'
import { addAppListener } from '@client/store/middleware/listener'
import { useCountryIso } from '@client/hooks'

export const useCalculations = (props: { table: Table }): void => {
  const { table } = props
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const rowsData = useMemo(() => table.rows.filter((row) => row.props.type !== RowType.header), [table.rows])
  const dependants: Record<string, Array<VariableCache>> = useMemo(
    () =>
      rowsData.reduce((acc, row) => {
        const { variableName } = row.props
        const calculationsDependants = AssessmentMetaCaches.getCalculationsDependants({
          assessment,
          cycle,
          tableName: table.props.name,
          variableName,
        })
        const variableCaches = calculationsDependants.filter(({ tableName }) => tableName === table.props.name)
        return {
          ...acc,
          [variableName]: variableCaches,
        }
      }, {}),
    [assessment, cycle, rowsData, table.props.name]
  )

  useEffect(() => {
    const unsubscribe = dispatch(
      addAppListener({
        matcher: isAnyOf(DataActions.updateNodeValues.pending, DataActions.postEstimate.fulfilled),
        effect: ({ meta, payload }, { getState }) => {
          const state = getState()
          // TODO ------ FIX This
          const { data } = state.data
          const changedVariables = meta.arg.values ?? payload
          const nodes: Array<NodeUpdate> = []

          // for each changed variable...
          changedVariables.forEach(
            ({ colName: changedColName, variableName: changedVariableName }: Record<string, string>) => {
              // ...get variables that depend on it...
              const dependantsToCalculate = dependants[changedVariableName]
              if (!dependantsToCalculate) return

              // ...and loop through each of them and calculate
              dependantsToCalculate.forEach(({ variableName: dependantVariableName }) => {
                // dont calculate self
                if (dependantVariableName === changedVariableName) return

                // find the variable row metadata
                const row = rowsData.find((row) => row.props.variableName === dependantVariableName)
                // find the column metadata
                const col = row?.cols.find((col) => col.props.colName === changedColName)

                const calculateFn = col?.props.calculateFn?.[cycle.uuid] ?? row?.props.calculateFn?.[cycle.uuid]

                let nodeValue = TableDatas.getNodeValue({
                  data,
                  colName: changedColName,
                  countryIso,
                  tableName: table.props.name,
                  variableName: dependantVariableName,
                })

                if (calculateFn) {
                  const rawResult = ExpressionEvaluator.evalFormula<NodeValueValidation>({
                    assessment,
                    countryIso,
                    cycle,
                    data,
                    colName: changedColName,
                    row,
                    formula: calculateFn,
                  })

                  nodeValue = { raw: !Objects.isEmpty(rawResult) ? String(rawResult) : null, calculated: true }
                }

                nodes.push({
                  colName: changedColName,
                  tableName: table.props.name,
                  variableName: dependantVariableName,
                  value: nodeValue,
                })
              })
            }
          )

          dispatch(
            DataActions.setNodeCalculations({
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
  }, [cycle, countryIso, dispatch, rowsData, table.props.name, assessment, dependants])
}
