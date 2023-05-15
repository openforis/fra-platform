import { useEffect, useMemo } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'

import { NodeValueValidation, NodeValueValidations, RowType, Table } from '@meta/assessment'
import { NodeUpdate, TableDatas } from '@meta/data'
import { ExpressionEvaluator } from '@meta/expressionEvaluator'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { DataActions } from '@client/store/data'
import { addAppListener } from '@client/store/middleware/listener'
import { useCountryIso } from '@client/hooks'

export const useValidations = (props: { table: Table }): void => {
  const { table } = props
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const rowsData = useMemo(() => table.rows.filter((row) => row.props.type !== RowType.header), [table.rows])

  useEffect(() => {
    const unsubscribe = dispatch(
      addAppListener({
        matcher: isAnyOf(
          // AssessmentSectionActions.updateNodeValues.fulfilled,
          DataActions.getTableData.fulfilled,
          DataActions.setNodeCalculations,
          DataActions.setNodeValues
        ),
        effect: (_, { getState }) => {
          const state = getState()
          const { data } = state.ui.assessmentSection
          const nodes: Array<NodeUpdate> = []

          rowsData.forEach((row) => {
            const { variableName } = row.props
            const { cols } = row
            cols.forEach((col) => {
              const { colName } = col.props
              if (!colName) return

              const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]

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

              const nodeValue = TableDatas.getNodeValue({
                data,
                colName,
                countryIso,
                tableName: table.props.name,
                variableName,
              })

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
            DataActions.setNodeValidations({
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
