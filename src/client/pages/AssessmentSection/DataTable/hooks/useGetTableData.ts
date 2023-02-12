import { useEffect, useMemo } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName, Table, TableNames } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useCountry } from '@client/store/assessment'
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
  const country = useCountry(countryIso)
  const { odp } = table.props

  const dispatch = useAppDispatch()
  const tableNames = useTableNames(props)

  // if we are using original data point, and we are not in table 1a extent of forest, we need to merge odp data for calculations
  const mergeOdp =
    country.props?.forestCharacteristics.useOriginalDataPoint && table.props.name !== TableNames.extentOfForest

  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getTableData({
        assessmentName,
        countryIso,
        cycleName,
        tableNames,
        mergeOdp,
      })
    )

    if (odp) {
      dispatch(AssessmentSectionActions.getOriginalDataPointData({ assessmentName, countryIso, cycleName }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, mergeOdp, odp, tableNames])
}
