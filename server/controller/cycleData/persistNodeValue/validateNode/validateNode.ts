import { Row, VariableCache } from '@meta/assessment'

import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'
import { ColRepository } from '@server/repository/assessment/col'
import { RowRepository } from '@server/repository/assessment/row'

import { evaluateNode } from './evaluateNode'

export const validateNode = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, tableName, variableName, colName } = props
  const queue: Array<VariableCache> = [
    // ...(assessment.metaCache.calculations.dependants[tableName]?.[variableName] ?? []),
    { variableName, tableName },
  ]
  // const visitedVariables: Array<VariableCache> = [{ variableName, tableName }]
  const visitedVariables: Array<VariableCache> = []

  while (queue.length !== 0) {
    const variableCache = queue.shift()
    const visited = visitedVariables.find(
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
        { assessment, tableName: variableCache.tableName, variableName: variableCache.variableName },
        client
      )
      const evaluateProps = {
        ...props,
        tableName: variableCache.tableName,
        variableName: variableCache.variableName,
        variableCache,
        row,
      }
      // eslint-disable-next-line no-await-in-loop
      const cols = await ColRepository.getMany({ assessment, rowId: row.id }, client)
      if (row.props.validateFn) {
        // make sure in target table there's a matching column
        if (cols.find((c) => c.props.colName === colName)) {
          // eslint-disable-next-line no-await-in-loop
          await evaluateNode({ ...evaluateProps, expression: row.props.validateFn }, client)
        }
      }

      // TODO: check when validation if needed at col level
      // else {
      //   // eslint-disable-next-line no-await-in-loop
      //   await Promise.all(
      //     cols.map(async (col) => {
      //       if (col.props.calculateFn) {
      //         await evaluateNode(
      //           { ...evaluateProps, colName: col.props.colName, expression: col.props.calculateFn },
      //           client
      //         )
      //       }
      //     })
      //   )
      // }
      //

      // TODO
      // queue.push(
      //   ...(assessment.metaCache.calculations.dependants[variableCache.tableName]?.[variableCache.variableName] ?? [])
      // )

      visitedVariables.push(variableCache)
    }
  }
}
