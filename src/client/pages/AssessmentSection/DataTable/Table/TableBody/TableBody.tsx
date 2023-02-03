import React, { useEffect } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'

import {
  Assessment,
  AssessmentMetaCache,
  NodeValueValidation,
  NodeValueValidations,
  Row as TypeRow,
  RowType,
  Table,
} from '@meta/assessment'
import { VariablesByTableCache } from '@meta/assessment/assessmentMetaCache'
import { NodeUpdate, TableData, TableDatas } from '@meta/data'
import { ExpressionEvaluator } from '@meta/expressionEvaluator'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { addAppListener } from '@client/store/middleware/listener'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useCountryIso } from '@client/hooks'
import Row from '@client/pages/AssessmentSection/DataTable/Table/Row'

type Props = {
  disabled: boolean
  table: Table
  sectionName: string
  assessmentName: string
  data: TableData
}

type UseValidateProps = {
  table: Table
  rowsData: TypeRow[]
}
// ===================

const useValidations = (props: UseValidateProps) => {
  const { table, rowsData } = props
  const assessmentOrig = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()

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
              const metaCache: AssessmentMetaCache = {
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
              }

              const assessment: Assessment = { ...assessmentOrig, metaCache: { [cycle.uuid]: metaCache } }
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
                assessment: assessmentOrig,
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
  }, [assessmentOrig, countryIso, cycle, dispatch, rowsData, table.props.name, table.validationDependencies])
}

const TableBody: React.FC<Props> = (props) => {
  const { disabled, table, assessmentName, sectionName, data } = props
  const rowsData = table.rows.filter((row) => row.props.type !== RowType.header)

  useValidations({ table, rowsData })

  return (
    <tbody>
      {rowsData.map((row: TypeRow) => {
        return (
          <Row
            key={row.uuid}
            assessmentName={assessmentName}
            sectionName={sectionName}
            table={table}
            data={data}
            row={row}
            disabled={disabled}
          />
        )
      })}
    </tbody>
  )
}

export default TableBody
