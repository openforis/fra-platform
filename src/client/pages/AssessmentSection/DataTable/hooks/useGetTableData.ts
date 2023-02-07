import { useEffect } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName, Table } from '@meta/assessment'

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

export const useGetTableData = (props: Props) => {
  const { assessmentName, countryIso, cycleName, sectionName, table } = props

  const dispatch = useAppDispatch()
  const canEdit = useCanEdit(sectionName)

  useEffect(() => {
    const { name: tableName, odp } = table.props

    const tableNamesSet = new Set([tableName])
    if (canEdit && table.validationDependencies) {
      Object.values(table.validationDependencies).forEach((variables) =>
        variables.forEach((variable) => tableNamesSet.add(variable.tableName))
      )
    }
    const tableNames = Array.from(tableNamesSet)

    dispatch(AssessmentSectionActions.getTableData({ assessmentName, countryIso, cycleName, tableNames }))

    if (odp) {
      dispatch(AssessmentSectionActions.getOriginalDataPointData({ assessmentName, countryIso, cycleName }))
    }
  }, [assessmentName, canEdit, countryIso, cycleName, dispatch, table])
}
