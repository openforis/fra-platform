import { Row } from 'meta/assessment'
import { NodeUpdates } from 'meta/data'

import { Context } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies/context'
import { Props } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies/props'
import { BaseProtocol } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'
import { Logger } from 'server/utils/logger'

import { DependantType, getDependants } from '../utils/getDependants'
import { isODPCell } from '../utils/isODPCell'
import { calculateNode } from './calculateNode'

const _getDebugKey = (props: Props): string =>
  `[updateCalculationDependencies-${[props.countryIso, props.tableName, props.variableName, props.colName].join('-')}]`

const type: DependantType = 'calculations'

export const updateCalculationDependencies = async (props: Props, client: BaseProtocol): Promise<NodeUpdates> => {
  const { assessment, cycle, countryIso, sectionName, tableName, variableName, colName, user, isODP } = props

  const odpCell = await isODPCell({ colName, tableName, countryIso, cycle, assessment }, client)
  // Don't include ODP data when calculating dependants of ODP cell
  const mergeOdp = isODP || !odpCell

  const context = new Context({ assessment, cycle, countryIso })
  const propsDependants = { assessment, cycle, countryIso, tableName, variableName, colName, isODP, odpCell, type }
  context.queue.push(...getDependants(propsDependants))

  // self is not visited if it depends on itself
  const selfInQueue = context.queue.find(
    (dependant) => dependant.variableName === variableName && dependant.tableName === tableName
  )
  if (!selfInQueue) {
    context.visitedVariables.push({ variableName, tableName })
  }

  const debugKey = _getDebugKey(props)
  Logger.debug(`${debugKey} initial queue length ${context.queue.length}`)

  while (context.queue.length !== 0) {
    const variableCache = context.queue.shift()
    Logger.debug(`${debugKey} processing queue item ${JSON.stringify(variableCache)}`)

    const visited = context.visitedVariables.find(
      (v) => v.tableName === variableCache.tableName && v.variableName === variableCache.variableName
    )
    // if (visited) {
    // throw new Error(
    //   `Circular dependency found ${tableName}.${variableName}->${variableCache.tableName}.${variableCache.variableName}`
    // )
    // continue
    //   console.log('------ variable visited ', variableCache)
    // }

    if (!visited) {
      // eslint-disable-next-line no-await-in-loop
      const row: Row = await RowRepository.getOne(
        { assessment, tableName: variableCache.tableName, variableName: variableCache.variableName, includeCols: true },
        client
      )
      const evaluateProps = {
        context,
        sectionName,
        tableName: variableCache.tableName,
        variableName: variableCache.variableName,
        row,
        colName,
        user,
      }

      if (row.props.calculateFn?.[cycle.uuid]) {
        // make sure in target table there's a matching column
        if (row.cols.find((c) => c.props.colName === colName)) {
          // eslint-disable-next-line no-await-in-loop
          await calculateNode({ ...evaluateProps, mergeOdp, formula: row.props.calculateFn[cycle.uuid] }, client)
        }
      } else {
        // eslint-disable-next-line no-await-in-loop
        await Promise.all(
          row.cols.map(async (col) => {
            if (col.props.calculateFn?.[cycle.uuid]) {
              await calculateNode(
                { ...evaluateProps, mergeOdp, colName: col.props.colName, formula: col.props.calculateFn[cycle.uuid] },
                client
              )
            }
          })
        )
      }

      const calculationDependants = getDependants({ ...propsDependants, ...variableCache })
      context.queue.push(...calculationDependants)
      context.visitedVariables.push(variableCache)
    }
  }

  return context.nodeUpdates
}
