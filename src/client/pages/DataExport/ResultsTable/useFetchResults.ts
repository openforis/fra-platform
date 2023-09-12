import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useDataExportSelection } from 'client/store/ui/dataExport'
import { useCountryIso, useGetRequest } from 'client/hooks'

type Props = {
  columnsAlwaysExport: Array<string>
  tableName: string
  sectionName: string
  assessmentName: AssessmentName
  cycleName: string
}

type UseFetchResults = {
  results: RecordAssessmentData
  resultsLoading: boolean
}

export const useFetchResults = (props: Props): UseFetchResults => {
  const { columnsAlwaysExport, tableName, sectionName, assessmentName, cycleName } = props
  const selection = useDataExportSelection(sectionName)
  const countryIso = useCountryIso()

  const {
    data: results = {},
    dispatch: fetchResults,
    loading: resultsLoading,
  } = useGetRequest(ApiEndPoint.CycleData.Table.tableData(), {
    params: {
      countryIso,
      assessmentName,
      cycleName,
      tableNames: [tableName],
      countryISOs: selection.countryISOs,
      variables: selection.sections[sectionName].variables,
      columns: [...columnsAlwaysExport, ...selection.sections[sectionName].columns],
    },
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchResults, [selection])

  return {
    results,
    resultsLoading,
  }
}
