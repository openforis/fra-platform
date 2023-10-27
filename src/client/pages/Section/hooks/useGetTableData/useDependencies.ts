import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { TableName, TableNames, VariableCache } from 'meta/assessment'

import { useCountry } from 'client/store/area'
import { useTableSections } from 'client/store/metadata'
import { useCanEdit } from 'client/store/user'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

import { Props } from './props'

const staticDependencies: Record<string, Array<string>> = {
  [TableNames.extentOfForest]: [TableNames.valueAggregate],
}

type Returned = {
  tableNames: Array<TableName>
  tableWithOdp: TableName
}

export const useDependencies = (props: Props): Returned => {
  const { sectionName } = props

  const { countryIso } = useSectionRouteParams()
  const tableSections = useTableSections({ sectionName })
  const canEdit = useCanEdit(sectionName)
  const country = useCountry(countryIso as CountryIso)
  const forestCharacteristicsUseOdp = country.props.forestCharacteristics?.useOriginalDataPoint

  return useMemo<Returned>(() => {
    const tableNames = new Set<TableName>()
    let tableWithOdp: TableName

    tableSections.forEach((tableSection) => {
      tableSection.tables.forEach((table) => {
        const { name: tableName } = table.props
        const withOdp =
          tableName === TableNames.extentOfForest ||
          (tableName === TableNames.forestCharacteristics && forestCharacteristicsUseOdp)

        tableNames.add(tableName)
        staticDependencies[tableName]?.forEach((t) => tableNames.add(t))
        if (withOdp) {
          tableNames.add(TableNames.originalDataPointValue)
          tableWithOdp = tableName
        }

        const addVariables = (variables: Array<Array<VariableCache>>): void => {
          variables.flat(1).forEach((variable) => {
            tableNames.add(variable.tableName)
          })
        }

        if (table.calculationDependencies) {
          addVariables(Object.values(table.calculationDependencies))
        }
        if (canEdit && table.validationDependencies) {
          addVariables(Object.values(table.validationDependencies))
        }
      })
    })

    return { tableNames: Array.from(tableNames), tableWithOdp }
  }, [canEdit, forestCharacteristicsUseOdp, tableSections])
}
