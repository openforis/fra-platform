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
  // const sectionFormatted = Strings.snakeCase(formatSection(assessmentSection, assessmentType))

  const {
    data: results = {},
    dispatch: fetchResults,
    loading: resultsLoading,
  } = useGetRequest(ApiEndPoint.Assessment.TableData.one('AF', assessmentName, cycleName, assessmentSection), {
    params: {
      tableNames: [tableName],
      columns: [
        ...columnsAlwaysExport,
        ...selection.sections[assessmentSection].columns.map((column) => formatColumn(column, assessmentSection)),
      ],
      countries: selection.countryISOs,
      variables: selection.sections[assessmentSection].variables,
    },
  })

  useEffect(fetchResults, [selection])

  return {
    results,
    resultsLoading,
  }
}
