import { useMemo } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { TableName, TableNames } from 'meta/assessment/table'
import { Objects } from 'utils/objects'

import { useCountry } from 'client/store/area/hooks/country'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useTableSections } from 'client/store/meta/hooks/tableSections'
import { useSectionRouteParams } from 'client/hooks/routeParams'

import { Props } from './props'

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

  const { assessmentName, countryIso, cycleName } = useSectionRouteParams()
  const assessment = useAssessment()
  const cycle = useCycle()
  const tableSections = useTableSections({ sectionName })
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
        if (withOdp) {
          internal.tableNames.add(TableNames.originalDataPointValue)
          internal.tableWithOdp = tableName
        }

        const propsDeps = { assessment, cycle, tableName }
        const calculationDependencies = AssessmentMetaCaches.getTableCalculationsDependencies(propsDeps)
        if (calculationDependencies) {
          addDependencies(Object.values(calculationDependencies))
        }
      })
    })

    return { external, internal }
  }, [assessment, assessmentName, cycle, cycleName, forestCharacteristicsUseOdp, tableSections])
}
