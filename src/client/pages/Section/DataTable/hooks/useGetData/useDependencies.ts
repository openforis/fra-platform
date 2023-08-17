import { useMemo } from 'react'

import { TableNames, VariableCache } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCanEdit } from 'client/store/user'

import { Props } from './props'
import { TableDependencies } from './tableDependencies'

const staticDependencies: Record<string, Array<string>> = {
  [TableNames.extentOfForest]: [TableNames.valueAggregate],
}

export const useDependencies = (props: Props): TableDependencies => {
  const { sectionName, table } = props

  const assessment = useAssessment()
  const cycle = useCycle()
  const canEdit = useCanEdit(sectionName)

  return useMemo<TableDependencies>(() => {
    const { name: tableName } = table.props
    const dependencies = new TableDependencies({ assessment, cycle })

    dependencies.add({ tableName })
    staticDependencies[tableName]?.forEach((t) => dependencies.add({ tableName: t }))

    const addVariables = (variables: Array<Array<VariableCache>>): void => {
      variables.flat(1).forEach((variable) => {
        const dependency = {
          assessmentName: variable.assessmentName,
          cycleName: variable.cycleName,
          tableName: variable.tableName,
        }
        dependencies.add(dependency)
      })
    }

    if (table.calculationDependencies) {
      addVariables(Object.values(table.calculationDependencies))
    }
    if (canEdit && table.validationDependencies) {
      addVariables(Object.values(table.validationDependencies))
    }

    return dependencies
  }, [assessment, canEdit, cycle, table])
}
