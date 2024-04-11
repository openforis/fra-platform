import { useMemo } from 'react'

import { Table as TableType, TableName, VariableCache } from 'meta/assessment'

export const useDependencies = (table: TableType): Set<TableName> => {
  return useMemo<Set<TableName>>(() => {
    const tableNames: Set<TableName> = new Set<TableName>()

    const addDependencies = (variables: Array<Array<VariableCache>>): void => {
      variables.flat(1).forEach((variable) => {
        tableNames.add(variable.tableName)
      })
    }

    // throw error if calculationDependencies is undefined
    if (!table.calculationDependencies) {
      throw new Error('calculationDependencies is not defined')
    }

    addDependencies(Object.values(table.calculationDependencies))
    return tableNames
  }, [table.calculationDependencies])
}
