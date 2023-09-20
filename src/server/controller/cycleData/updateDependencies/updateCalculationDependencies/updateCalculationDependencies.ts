import { Row } from 'meta/assessment'
import { NodeUpdates } from 'meta/data'

import { Context } from 'server/controller/cycleData/updateDependencies/context/context'
import { RowRepository } from 'server/repository/assessment/row'
import { Logger } from 'server/utils/logger'

import { calculateNode } from './calculateNode'
// import { Props } from './props'

type Props = {
  context: Context
  jobId?: string
}

const _getDebugKey = (props: Props): string => {
  const { context, jobId } = props
  const { assessment, cycle, countryIso } = context
  return `[updateCalculationDependencies] job-${jobId} ${[assessment.props.name, cycle.name, countryIso].join('-')}`
}

// const type: DependantType = 'calculations'

export const updateCalculationDependencies = async (props: Props): Promise<NodeUpdates> => {
  const { context } = props
  const { assessment, cycle } = context
  // const odpCell = await isODPCell({ colName, tableName, countryIso, cycle, assessment }, client)
  // // Don't include ODP data when calculating dependants of ODP cell
  // const mergeOdp = isODP || !odpCell
  // const tableNames: Array<TableName> = []
  // const countryISOs = [countryIso]
  // const data = await getTableData({ assessment, cycle, countryISOs, tableNames, variables: [], columns: [], mergeOdp })
  //
  // const context = new Context({ assessment, cycle, countryIso, data })
  // const propsDependants = { assessment, cycle, countryIso, tableName, variableName, colName, isODP, odpCell, type }
  // context.queue.push(...getDependants(propsDependants))
  //
  // // self is not visited if it depends on itself
  // const selfInQueue = context.queue.find(
  //   (dependant) => dependant.variableName === variableName && dependant.tableName === tableName
  // )
  // if (!selfInQueue) {
  //   context.visitedVariables.push({ variableName, tableName })
  // }

  const debugKey = _getDebugKey(props)
  Logger.debug(`${debugKey} queue length ${context.queue.length}`)

  while (context.queue.length !== 0) {
    const variableCache = context.queue.shift()
    const { tableName, variableName, colName } = variableCache

    Logger.debug(`${debugKey} processing queue item ${JSON.stringify(variableCache)}`)

    const visited = context.visitedVariables.find((v) => v.tableName === tableName && v.variableName === variableName)
    // if (visited) {
    // throw new Error(
    //   `Circular dependency found ${tableName}.${variableName}->${variableCache.tableName}.${variableCache.variableName}`
    // )
    // continue
    //   console.log('------ variable visited ', variableCache)
    // }

    if (!visited) {
      // eslint-disable-next-line no-await-in-loop
      const row: Row = await RowRepository.getOne({ assessment, tableName, variableName, includeCols: true })
      const evaluateProps = { context, tableName, variableName, row, colName }
      // sectionName,
      // user,

      if (row.props.calculateFn?.[cycle.uuid]) {
        // make sure in target table there's a matching column
        if (row.cols.find((c) => c.props.colName === colName)) {
          calculateNode({ ...evaluateProps, formula: row.props.calculateFn[cycle.uuid] })
        }
      } else {
        // TODO: TO avoid calculating all columns, handle dependencies per column, not row
        row.cols.forEach((col) => {
          if (col.props.calculateFn?.[cycle.uuid]) {
            calculateNode({ ...evaluateProps, colName: col.props.colName, formula: col.props.calculateFn[cycle.uuid] })
          }
        })
      }

      // const calculationDependants = getDependants({ ...propsDependants, ...variableCache })
      // context.queue.push(...calculationDependants)
      context.visitedVariables.push(variableCache)
    }
  }

  return context.nodeUpdates
}
