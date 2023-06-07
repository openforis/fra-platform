import { useEffect, useMemo } from 'react'
import { batch } from 'react-redux'

import { CountryIso } from 'meta/area'
import { AssessmentName, Table, TableNames } from 'meta/assessment'

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

const useTableNames = (props: Props): Array<string> => {
  const { sectionName, table } = props
  const canEdit = useCanEdit(sectionName)

  const { calculationDependencies, validationDependencies } = table
  const { name: tableName } = table.props

  const tableNames: Array<string> = useMemo<Array<string>>(() => {
    const tableNamesSet = new Set<string>([tableName])
    dependencyTables[tableName]?.forEach((t) => tableNamesSet.add(t))

    if (canEdit && validationDependencies) {
      Object.values(validationDependencies).forEach((variables) =>
        variables.forEach((variable) => tableNamesSet.add(variable.tableName))
      )
    }

    if (calculationDependencies) {
      Object.values(calculationDependencies).forEach((variables) =>
        variables.forEach((variable) => tableNamesSet.add(variable.tableName))
      )
    }

    return Array.from(tableNamesSet)
  }, [calculationDependencies, canEdit, tableName, validationDependencies])

  return tableNames
}

export const useGetTableData = (props: Props) => {
  const { assessmentName, countryIso, cycleName, sectionName, table } = props
  const { name: tableName, odp } = table.props

  const dispatch = useAppDispatch()
  const tableNames = useTableNames(props)

  useEffect(() => {
    batch(() => {
      tableNames.forEach((_tableName) => {
        const isTableProps = _tableName === tableName
        // merge odp is true when table 1a and 1b are included as dependency
        const mergeOdp = !(
          isTableProps &&
          [TableNames.extentOfForest, TableNames.forestCharacteristics].includes(_tableName as TableNames)
        )
        const getTableDataProps = { assessmentName, countryIso, cycleName, tableNames: [_tableName], mergeOdp }
        dispatch(DataActions.getTableData(getTableDataProps))
      })
      if (odp) {
        dispatch(DataActions.getOriginalDataPointData({ assessmentName, countryIso, cycleName }))
        dispatch(
          DataActions.getNodeValuesEstimations({ assessmentName, countryIso, cycleName, tableName, sectionName })
        )
      }
    })
  }, [assessmentName, countryIso, cycleName, dispatch, odp, sectionName, tableName, tableNames])
}
