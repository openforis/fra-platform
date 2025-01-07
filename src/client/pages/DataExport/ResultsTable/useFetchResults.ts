import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName } from 'meta/assessment'
import { TableCell } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

import { useDataExportSelection } from 'client/store/ui/dataExport'
import { useCountryIso, useGetRequest } from 'client/hooks'

type Props = {
  assessmentName: AssessmentName
  cellsExportAlways: Array<TableCell>
  columnsAlwaysExport: Array<string>
  cycleName: string
  sectionName: string
  tableName: string
}

type UseFetchResults = {
  results: RecordAssessmentData
  resultsLoading: boolean
}

export const useFetchResults = (props: Props): UseFetchResults => {
  const { assessmentName, cellsExportAlways, columnsAlwaysExport, cycleName, sectionName, tableName } = props
  const selection = useDataExportSelection(sectionName)
  const countryIso = useCountryIso()

  const cellsExportAlwaysColumns = cellsExportAlways.map((cell) => cell.columnName)
  const cellsExportAlwaysVariables = cellsExportAlways.map((cell) => cell.variableName)

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
      variables: [...cellsExportAlwaysVariables, ...selection.sections[sectionName].variables],
      columns: [...cellsExportAlwaysColumns, ...columnsAlwaysExport, ...selection.sections[sectionName].columns],
    },
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchResults, [selection])

  return {
    results,
    resultsLoading,
  }
}
