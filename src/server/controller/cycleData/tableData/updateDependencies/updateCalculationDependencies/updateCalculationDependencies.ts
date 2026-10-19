import { NodeCalculations } from 'meta/assessment/nodeCalculations'
import { RowCaches } from 'meta/assessment/rowCaches'

import { Context, ContextResult } from 'server/controller/cycleData/tableData/updateDependencies/context'
import { Logger } from 'server/utils/logger'

type Props = {
  context: Context
  jobId?: string
}

const _getLogKey = (props: Props): string => {
  const { context, jobId } = props
  const { assessment, countryIso, cycle } = context
  return `[updateDependencies-queue] [${[assessment.props.name, cycle.name, countryIso].join('-')}] [job-${jobId}]`
}

export const updateCalculationDependencies = (props: Props): ContextResult => {
  const { context } = props
  const { assessment, assessments, countryIso, cycle, data, rows } = context
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const logKey = _getLogKey(props)
  Logger.debug(`${logKey} queue length ${context.queue.length}`)

  while (context.queue.length !== 0) {
    const variableCache = context.queue.shift()
    const { colName, tableName, variableName } = variableCache

    Logger.debug(`${logKey} processing queue item ${JSON.stringify(variableCache)}`)

    const visited = context.visitedVariables.find(
      (v) => v.tableName === tableName && v.variableName === variableName && v.colName === colName
    )

    if (!visited) {
      const row = rows[RowCaches.getKey({ tableName, variableName })]
      const propsCalculate = { assessments, assessmentName, cycleName, countryIso, tableName, row, data }

      if (row.props.calculateFn?.[cycle.uuid]) {
        // make sure in target table there's a matching column
        const col = row.cols.find((c) => c.props.colName === colName)
        if (col) {
          const value = NodeCalculations.calculate({ ...propsCalculate, col })
          if (value) {
            context.result.push({ row, col, value })
          }
        }
      } else {
        /**
         * Soring columns is a HACK FOR HAVING RIGHT CALCULATION ORDER!! =D.
         * in panEuropean table4.3bII col native_species depends on introduced_species that depends on 4.3I.plantations. but in column orders comes before introduced_species.
         * Therefore, when introduced_species or 4.3I.plantations change, native_species gets calculated before introduced_species/
         * TODO: To fix this handle dependencies per column
         */
        const colsSorted = row.cols.sort((colA, colB) => {
          return (colA.props.calcOrder ?? 0) - (colB.props.calcOrder ?? 0)
        })
        // TODO: TO avoid calculating all columns, handle dependencies per column, not row
        colsSorted.forEach((col) => {
          if (col.props.calculateFn?.[cycle.uuid] && col.props.colName) {
            const value = NodeCalculations.calculate({ ...propsCalculate, col })
            if (value) {
              context.result.push({ row, col, value })
            }
          }
        })
      }

      context.visitedVariables.push(variableCache)
    }
  }

  return context.result
}
