import { useEffect } from 'react'

import { AssessmentType } from '@core/assessment'
import { Strings } from '@core/utils'
import { useDataExportSelection } from '@webapp/store/page/dataExport'
import { useGetRequest } from '@webapp/hooks'
import { DataExportResults, formatColumn, formatSection } from '@webapp/components/Assessment/DataExport/utils'

type Props = {
  columnsAlwaysExport: Array<string>
  assessmentSection: string
  assessmentType: AssessmentType
}

type UseFetchResults = {
  results: DataExportResults
  resultsLoading: boolean
}

export const useFetchResults = (props: Props): UseFetchResults => {
  const { columnsAlwaysExport, assessmentSection, assessmentType } = props
  const selection = useDataExportSelection(assessmentSection)
  const sectionFormatted = Strings.snakeCase(formatSection(assessmentSection, assessmentType))

  const {
    data: results = {},
    dispatch: fetchResults,
    loading: resultsLoading,
  } = useGetRequest(`/api/export/${assessmentType}/${sectionFormatted}`, {
    params: {
      columns: [
        ...columnsAlwaysExport,
        ...selection.sections[assessmentSection].columns.map((column) => formatColumn(column, assessmentSection)),
      ],
      countries: selection.countryISOs,
      variables: [selection.sections[assessmentSection].variable],
    },
  })

  useEffect(fetchResults, [selection])

  return {
    results,
    resultsLoading,
  }
}
