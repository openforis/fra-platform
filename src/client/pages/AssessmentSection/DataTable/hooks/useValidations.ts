import { useEffect, useMemo } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'

import { NodeValueValidation, NodeValueValidations, RowType, Table, TableNames } from 'meta/assessment'
import { NodeUpdate, RecordAssessmentDatas } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCountry, useCycle } from 'client/store/assessment'
import { DataActions, useOriginalDataPointYears, useTableData } from 'client/store/data'
import { addAppListener } from 'client/store/middleware/listener'
import { useCountryIso } from 'client/hooks'

export const useValidations = (props: { table: Table }): void => {
  const { table } = props
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const rowsData = useMemo(() => table.rows.filter((row) => row.props.type !== RowType.header), [table.rows])
  const data = useTableData({ table })
  const odpYears = useOriginalDataPointYears()
  const country = useCountry(countryIso)
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

  useEffect(() => {
    const unsubscribe = dispatch(
      addAppListener({
        matcher: isAnyOf(
          // AssessmentSectionActions.updateNodeValues.fulfilled,
          DataActions.getTableData.fulfilled,
          DataActions.setNodeCalculations,
          DataActions.setNodeValues
        ),
        effect: (_) => {
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

              const nodeValue = RecordAssessmentDatas.getNodeValue({
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
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

              const isODPCell =
                useOriginalDataPoint &&
                Boolean(table.props.odp && !col.props.labels && odpYears?.find((odp) => odp.year === colName))

              nodes.push({
                colName,
                tableName: isODPCell ? TableNames.originalDataPointValue : table.props.name,
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
  }, [
    cycle,
    countryIso,
    dispatch,
    rowsData,
    table.props.name,
    assessment,
    data,
    table.props.odp,
    useOriginalDataPoint,
    odpYears,
  ])
}
