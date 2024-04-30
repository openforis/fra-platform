import { useMemo } from 'react'

import { TableName, VariableCache } from 'meta/assessment'

import { Props } from 'client/components/Dashboard/props'

export const useDependencies = (props: Props): Set<TableName> => {
  const { items } = props

  return useMemo<Set<TableName>>(() => {
    const tableNames: Set<TableName> = new Set<TableName>()

    const addDependencies = (variables: Array<Array<VariableCache>>): void => {
      variables.flat(1).forEach((variable) => {
        tableNames.add(variable.tableName)
      })
    }

    items.forEach(({ table }) => {
      // throw error if calculationDependencies is undefined
      if (!table.calculationDependencies) {
        throw new Error(`calculationDependencies is not defined for table ${table.props.name}`)
      }

      addDependencies(Object.values(table.calculationDependencies))
    })

    return tableNames
  }, [items])
}
