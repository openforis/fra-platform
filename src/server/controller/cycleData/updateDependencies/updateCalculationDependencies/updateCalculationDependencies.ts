import { Row } from 'meta/assessment'

import { RowRepository } from 'server/repository/assessment/row'
import { Logger } from 'server/utils/logger'

import { Context, ContextResult } from '../context'
import { calculateNode } from './calculateNode'

type Props = {
  context: Context
  jobId?: string
}

const _getDebugKey = (props: Props): string => {
  const { context, jobId } = props
  const { assessment, cycle, countryIso } = context
  return `[updateDependencies-queue] [job-${jobId}] ${[assessment.props.name, cycle.name, countryIso].join('-')}`
}

export const updateCalculationDependencies = async (props: Props): Promise<ContextResult> => {
  const { context } = props
  const { assessment, cycle } = context

  const debugKey = _getDebugKey(props)
  Logger.debug(`${debugKey} queue length ${context.queue.length}`)

  while (context.queue.length !== 0) {
    const variableCache = context.queue.shift()
    const { tableName, variableName, colName } = variableCache

    Logger.debug(`${debugKey} processing queue item ${JSON.stringify(variableCache)}`)

    const visited = context.visitedVariables.find((v) => v.tableName === tableName && v.variableName === variableName)

    if (!visited) {
      // eslint-disable-next-line no-await-in-loop
      const row: Row = await RowRepository.getOne({ assessment, tableName, variableName, includeCols: true })
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
