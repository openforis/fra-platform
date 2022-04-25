import { useEffect } from 'react'

import { ApiEndPoint } from '@common/api/endpoint'

import { AssessmentName } from '@meta/assessment'
import { TableData } from '@meta/data'

import { useDataExportSelection } from '@client/store/pages/dataExport'
import { useGetRequest } from '@client/hooks'
import { formatColumn } from '@client/pages/DataExport/utils'

type Props = {
  columnsAlwaysExport: Array<string>
  tableName: string
  assessmentSection: string
  assessmentName: AssessmentName
  cycleName: string
}

type UseFetchResults = {
  results: TableData
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
      countryISOs: selection.countryISOs,
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
