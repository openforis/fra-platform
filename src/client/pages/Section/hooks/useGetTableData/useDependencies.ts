import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, TableName, TableNames, VariableCache } from 'meta/assessment'

import { useCountry } from 'client/store/area'
import { useTableSections } from 'client/store/metadata'
import { useCanEdit } from 'client/store/user'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

import { Props } from './props'

const staticDependencies: Record<string, Array<string>> = {
  // [TableNames.extentOfForest]: [TableNames.valueAggregate],
}

// different assessment / cycle
type ExternalDependencies = Record<AssessmentName, Record<CycleName, Set<TableName>>>

// same assessment / cycle
type InternalDependencies = {
  tableNames: Set<TableName>
  tableWithOdp?: TableName
}

type Returned = {
  external: ExternalDependencies
  internal: InternalDependencies
}

export const useDependencies = (props: Props): Returned => {
  const { sectionName } = props

  const { assessmentName, cycleName, countryIso } = useSectionRouteParams()
  const tableSections = useTableSections({ sectionName })
  const canEdit = useCanEdit(sectionName)
  const country = useCountry(countryIso as CountryIso)
  const forestCharacteristicsUseOdp = country.props.forestCharacteristics?.useOriginalDataPoint

  return useMemo<Returned>(() => {
    const external: ExternalDependencies = {}
    const internal: InternalDependencies = { tableNames: new Set<TableName>() }

    const addDependencies = (variables: Array<Array<VariableCache>>): void => {
      variables.flat(1).forEach((variable) => {
        const isInternal =
          !variable.assessmentName ||
          !variable.cycleName ||
          (variable.assessmentName === assessmentName && variable.cycleName === cycleName)

        if (isInternal) {
          internal.tableNames.add(variable.tableName)
        } else {
          if (!external[variable.assessmentName]?.[variable.cycleName]) {
            const path = [variable.assessmentName, variable.cycleName]
            Objects.setInPath({ obj: external, path, value: new Set<TableName>() })
          }
          external[variable.assessmentName][variable.cycleName].add(variable.tableName)
        }
      })
    }

    tableSections.forEach((tableSection) => {
      tableSection.tables.forEach((table) => {
        const { name: tableName } = table.props
        const withOdp =
          tableName === TableNames.extentOfForest ||
          (tableName === TableNames.forestCharacteristics && forestCharacteristicsUseOdp)

        internal.tableNames.add(tableName)
        staticDependencies[tableName]?.forEach((t) => internal.tableNames.add(t))
        if (withOdp) {
          internal.tableNames.add(TableNames.originalDataPointValue)
          internal.tableWithOdp = tableName
        }

        if (table.calculationDependencies) {
          addDependencies(Object.values(table.calculationDependencies))
        }
        if (canEdit && table.validationDependencies) {
          addDependencies(Object.values(table.validationDependencies))
        }
      })
    })

    return { external, internal }
  }, [assessmentName, canEdit, cycleName, forestCharacteristicsUseOdp, tableSections])
}
