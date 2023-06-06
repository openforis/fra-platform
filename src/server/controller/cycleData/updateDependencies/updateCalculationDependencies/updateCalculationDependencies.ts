import { Row, VariableCache } from 'meta/assessment'
import { NodeUpdates } from 'meta/data'

import { PersistNodeValueProps } from 'server/controller/cycleData/persistNodeValues/props'
import { BaseProtocol } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'
import { Logger } from 'server/utils/logger'

import { getDependants } from '../utils/getDependants'
import { isODPCell } from '../utils/isODPCell'
import { calculateNode } from './calculateNode'

export const updateCalculationDependencies = async (
  props: Omit<PersistNodeValueProps, 'value'> & { isODP?: boolean },
  client: BaseProtocol
): Promise<NodeUpdates> => {
  const { assessment, cycle, countryIso, sectionName, tableName, variableName, colName, user, isODP } = props

  const nodeUpdates: NodeUpdates = { assessment, cycle, countryIso, nodes: [] }
  const queue: Array<VariableCache> = await getDependants(
    { assessment, cycle, variableName, tableName, colName, countryIso, isODP, type: 'calculations' },
    client
  )
  const visitedVariables: Array<VariableCache> = []
  // self is not visited if it depends on itself
  if (!queue.find((dependant) => dependant.variableName === variableName && dependant.tableName === tableName)) {
    visitedVariables.push({ variableName, tableName })
  }

  // Don't include ODP data when calculating dependants of ODP cell
  const _isODPCell = await isODPCell({ colName, tableName, countryIso, cycle, assessment }, client)
  const mergeOdp = isODP || !_isODPCell

  const debugKey = `[updateCalculationDependencies-${[props.tableName, props.variableName, props.colName].join('-')}]`
  Logger.debug(`${debugKey} initial queue length ${queue.length}`)

  while (queue.length !== 0) {
    const variableCache = queue.shift()
    Logger.debug(`${debugKey} processing queue item ${JSON.stringify(variableCache)}`)

    const visited = visitedVariables.find((v) => v.tableName === variableCache.tableName && v.variableName === variableCache.variableName)
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
        countryIso,
        assessment,
        cycle,
        sectionName,
        colName,
        row,
        tableName: variableCache.tableName,
        variableName: variableCache.variableName,
        user,
      }

      if (row.props.calculateFn?.[cycle.uuid]) {
        // make sure in target table there's a matching column
        if (row.cols.find((c) => c.props.colName === colName)) {
          // eslint-disable-next-line no-await-in-loop
          await calculateNode({ ...evaluateProps, mergeOdp, formula: row.props.calculateFn[cycle.uuid], nodeUpdates }, client)
        }
      } else {
        // eslint-disable-next-line no-await-in-loop
        await Promise.all(
          row.cols.map(async (col) => {
            if (col.props.calculateFn?.[cycle.uuid]) {
              await calculateNode(
                {
                  ...evaluateProps,
                  mergeOdp,
                  colName: col.props.colName,
                  formula: col.props.calculateFn[cycle.uuid],
                  nodeUpdates,
                },
                client
              )
            }
          })
        )
      }
      // eslint-disable-next-line no-await-in-loop
      const calculationDependants = await getDependants(
        { assessment, cycle, countryIso, colName, isODP, type: 'calculations', ...variableCache },
        client
      )
      queue.push(...calculationDependants)

      visitedVariables.push(variableCache)
    }
  }

  return nodeUpdates
}
