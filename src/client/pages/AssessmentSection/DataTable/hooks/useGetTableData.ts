import { useEffect, useMemo } from 'react'
import { batch } from 'react-redux'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, Table, TableName, TableNames } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data/slice'
import { useCanEdit } from 'client/store/user'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  sectionName: string
  table: Table
}

const dependencyTables: Record<string, Array<string>> = {
  [TableNames.extentOfForest]: [TableNames.valueAggregate],
}

type Dependency = { tableName: TableName; cycleName?: CycleName; assessmentName?: AssessmentName }
type Dependencies = Array<Dependency>

const useDependencies = (props: Props): Dependencies => {
  const { sectionName, table } = props
  const canEdit = useCanEdit(sectionName)

  const { calculationDependencies, validationDependencies } = table
  const { name: tableName } = table.props

  const tableNames: Dependencies = useMemo<Dependencies>(() => {
    const dependencies: Dependencies = [{ tableName }]

    dependencyTables[tableName]?.forEach((t) => dependencies.push({ tableName: t }))

    if (calculationDependencies || (canEdit && validationDependencies)) {
      Object.values({ ...(calculationDependencies ?? {}), ...(validationDependencies ?? {}) }).forEach((variables) =>
        variables.forEach((variable) => {
          const exists = dependencies.some(
            (dependency) =>
              dependency.tableName === variable.tableName &&
              dependency.cycleName === variable.cycleName &&
              dependency.assessmentName === variable.assessmentName
          )
          if (!exists)
            dependencies.push({
              tableName: variable.tableName,
              cycleName: variable.cycleName,
              assessmentName: variable.assessmentName,
            })
        })
      )
    }

    return dependencies
  }, [calculationDependencies, canEdit, tableName, validationDependencies])

  return tableNames
}

export const useGetTableData = (props: Props) => {
  const { assessmentName, countryIso, cycleName, sectionName, table } = props
  const { name: tableName, odp } = table.props
  const canEdit = useCanEdit(sectionName)

  const dispatch = useAppDispatch()
  const dependencies = useDependencies(props)

  useEffect(() => {
    batch(() => {
      dependencies.forEach((dependency) => {
        const isTableProps = dependency.tableName === tableName
        // merge odp is true when table 1a and 1b are included as dependency
        const mergeOdp = !(
          isTableProps &&
          [TableNames.extentOfForest, TableNames.forestCharacteristics].includes(dependency.tableName as TableNames)
        )
        const getTableDataProps = {
          assessmentName: dependency.assessmentName ?? assessmentName,
          countryIso,
          cycleName: dependency.cycleName ?? cycleName,
          tableNames: [dependency.tableName],
          mergeOdp,
        }

        dispatch(DataActions.getTableData(getTableDataProps))
      })
      if (odp) {
        dispatch(DataActions.getODPTableData({ assessmentName, countryIso, cycleName }))
        if (canEdit) {
          dispatch(
            DataActions.getNodeValuesEstimations({ assessmentName, countryIso, cycleName, tableName, sectionName })
          )
          dispatch(DataActions.getODPLastUpdatedTimestamp({ assessmentName, countryIso, cycleName, sectionName }))
        }
      }
    })
  }, [assessmentName, countryIso, cycleName, dispatch, odp, sectionName, tableName, dependencies, canEdit])
}
