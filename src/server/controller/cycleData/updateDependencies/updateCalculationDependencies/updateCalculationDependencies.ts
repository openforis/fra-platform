import { RowCaches } from 'meta/assessment'

import { Logger } from 'server/utils/logger'

import { Context, ContextResult } from '../context'
import { calculateNode } from './calculateNode'

type Props = {
  context: Context
  jobId?: string
}

const _getLogKey = (props: Props): string => {
  const { context, jobId } = props
  const { assessment, cycle, countryIso } = context
  return `[updateDependencies-queue] [${[assessment.props.name, cycle.name, countryIso].join('-')}] [job-${jobId}]`
}

export const updateCalculationDependencies = (props: Props): ContextResult => {
  const { context } = props
  const { cycle, rows } = context

  const logKey = _getLogKey(props)
  Logger.debug(`${logKey} queue length ${context.queue.length}`)

  while (context.queue.length !== 0) {
    const variableCache = context.queue.shift()
    const { tableName, variableName, colName } = variableCache

    Logger.debug(`${logKey} processing queue item ${JSON.stringify(variableCache)}`)

    const visited = context.visitedVariables.find(
      (v) => v.tableName === tableName && v.variableName === variableName && v.colName === colName
    )

    if (!visited) {
      const row = rows[RowCaches.getKey({ tableName, variableName })]
      const evaluateProps = { context, tableName, variableName, row }

      if (row.props.calculateFn?.[cycle.uuid]) {
        // make sure in target table there's a matching column
        const col = row.cols.find((c) => c.props.colName === colName)
        if (col) {
          calculateNode({ ...evaluateProps, col, formula: row.props.calculateFn[cycle.uuid] })
        }
      } else {
        // TODO: TO avoid calculating all columns, handle dependencies per column, not row
        row.cols.forEach((col) => {
          if (col.props.calculateFn?.[cycle.uuid]) {
            calculateNode({ ...evaluateProps, col, formula: col.props.calculateFn[cycle.uuid] })
          }
        })
      }

      context.visitedVariables.push(variableCache)
    }
  }

  return context.result
}
