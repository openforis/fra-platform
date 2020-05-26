import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'

export default () => {
  const { section, assessmentType } = useParams()
  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState([])
  const [results, setResults] = useState({})

  const [selection, setSelection] = useState({
    countries: [],
    columns: [],
    // { param, label }
    variable: {},
  })

  const { data: countries = [], dispatch: fetchCountries } = useGetRequest(`/api/countries`)

  useEffect(() => {
    fetchCountries()
  }, [])
  useEffect(() => {
    setSelection({
      ...selection,
      variable: {},
      columns: [],
    })

    if (assessmentType && section) {
      const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, section)
      const rowsExport = TableSpec.getRowsExport(tableSpec)
      const colsExport = TableSpec.getColumnsExport(tableSpec)
      setVariables(rowsExport)
      setColumns(colsExport)
    }
  }, [section])
  useEffect(() => {
    if (!section || !selection.countries.length || !selection.columns.length || !selection.variable.param) {
      return
    }
    // format section camelCase to snake_case
    const fetchResultsUrl = `/api/export/${section
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase()}`
    axios
      .get(fetchResultsUrl, {
        params: {
          columns: selection.columns.map(({ param }) => param),
          countries: selection.countries.map(({ param }) => param),
          variable: selection.variable.param,
        },
      })
      .then(({ data }) => {
        setResults(data)
      })
  }, [section, selection.countries, selection.columns, selection.variable])

  const setSelectionCountries = (value) => setSelection({ ...selection, countries: value })
  const setSelectionColumns = (value) => setSelection({ ...selection, columns: value })
  const setSelectionVariable = (value) => setSelection({ ...selection, variable: value })

  return {
    results,
    countries,
    columns,
    selection,
    variables,
    setSelectionCountries,
    setSelectionColumns,
    setSelectionVariable,
  }
}
