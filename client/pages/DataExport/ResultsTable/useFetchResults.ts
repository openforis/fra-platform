import { useEffect } from 'react'

import { ApiEndPoint } from '@common/api/endpoint'

import { AssessmentName } from '@meta/assessment'

import { useDataExportSelection } from '@client/store/pages/dataExport'
import { useGetRequest } from '@client/hooks'
import { DataExportResults, formatColumn } from '@client/pages/DataExport/utils'

type Props = {
  columnsAlwaysExport: Array<string>
  tableName: string
  assessmentSection: string
  assessmentName: AssessmentName
  cycleName: string
}

type UseFetchResults = {
  results: DataExportResults
  resultsLoading: boolean
}

export const useFetchResults = (props: Props): UseFetchResults => {
  const { columnsAlwaysExport, tableName, assessmentSection, assessmentName, cycleName } = props
  const selection = useDataExportSelection(assessmentSection)

  const {
    data: results = {},
    dispatch: fetchResults,
    loading: resultsLoading,
  } = useGetRequest(ApiEndPoint.Assessment.TableData.one(), {
    params: {
      countryIso: selection.countryISOs[0],
      assessmentName,
      cycleName,
      tableNames: [tableName],
      countries: selection.countryISOs,
      variables: selection.sections[assessmentSection].variables,
      columns: [
        ...columnsAlwaysExport,
        ...selection.sections[assessmentSection].columns.map((column) => formatColumn(column, assessmentSection)),
      ],
    },
  })

  useEffect(fetchResults, [selection])

  return {
    results,
    resultsLoading,
  }
}
