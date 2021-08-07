import { useEffect } from 'react'
import * as snake from 'to-snake-case'

import { AssessmentType } from '@core/assessment'
import { useDataExportSelection } from '@webapp/store/page/dataExport'
import { useGetRequest } from '@webapp/components/hooks'
import { formatColumn, formatSection } from '@webapp/components/Assessment/DataExport/utils/format'
import { DataExportResults } from '@webapp/components/Assessment/DataExport/utils'

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

  const {
    data: results = {},
    dispatch: fetchResults,
    // setState: setResultState,
    loading: resultsLoading,
  } = useGetRequest(`/api/export/${assessmentType}/${snake(formatSection(assessmentSection, assessmentType))}`, {
    params: {
      columns: [...columnsAlwaysExport, ...selection.columns.map((column) => formatColumn(column, assessmentSection))],
      countries: selection.countryISOs,
      variables: [selection.variable],
    },
  })

  useEffect(fetchResults, [selection])

  return {
    results,
    resultsLoading,
  }
}
