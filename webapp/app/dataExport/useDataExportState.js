import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import snake from 'to-snake-case'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { throttle } from '@webapp/utils/functionUtils'

import { formatColumn, formatSection } from '@webapp/app/dataExport/utils/format'

export default () => {
  const { section = '', assessmentType } = useParams()
  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState([])

  const [selection, setSelection] = useState({
    countries: [],
    columns: [],
    // { param, label }
    variable: {},
  })

  const { data: countries = [], dispatch: fetchCountries } = useGetRequest(`/api/countries`)

  const hasSelection = !!(selection.countries.length && selection.columns.length && selection.variable.param)

  const {
    data: results = {},
    dispatch: fetchResults,
    setState: setResultState,
    loading: resultsLoading,
  } = useGetRequest(`/api/export/${snake(formatSection(section))}`, {
    params: {
      columns: selection.columns.map(({ param }) => param).map((column) => formatColumn(column, section)),
      countries: selection.countries.map(({ param }) => param),
      variable: selection.variable.param,
    },
  })

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    setSelection({
      ...selection,
      variable: {},
      columns: [],
    })
    setResultState([])

    if (assessmentType && section) {
      const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, section)
      const rowsExport = TableSpec.getRowsExport(tableSpec)
      const colsExport = TableSpec.getColumnsExport(tableSpec)
      setVariables(rowsExport)
      setColumns(colsExport)
    }
  }, [section])

  useEffect(() => {
    if (section && hasSelection) {
      throttle(fetchResults, `fetchDataExportResults`, 800)()
    }
  }, [selection.countries, selection.columns, selection.variable])

  const setSelectionCountries = (value) => setSelection({ ...selection, countries: value })
  const setSelectionColumns = (value) => setSelection({ ...selection, columns: value })
  const setSelectionVariable = (value) => setSelection({ ...selection, variable: value })

  return {
    results,
    resultsLoading,
    countries,
    columns,
    selection,
    variables,
    hasSelection,
    setSelectionCountries,
    setSelectionColumns,
    setSelectionVariable,
  }
}
