import { useEffect, useMemo } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName, Table, TableNames } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/ui/assessmentSection'
import { useCanEdit } from '@client/store/user'

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
  const { assessmentName, countryIso, cycleName, table } = props
  const { odp } = table.props

  const dispatch = useAppDispatch()
  const tableNames = useTableNames(props)

  useEffect(() => {
    dispatch(AssessmentSectionActions.getTableData({ assessmentName, countryIso, cycleName, tableNames }))

    if (odp) {
      dispatch(AssessmentSectionActions.getOriginalDataPointData({ assessmentName, countryIso, cycleName }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, odp, tableNames])
}
