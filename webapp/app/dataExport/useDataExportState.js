import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import snake from 'to-snake-case'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { throttle } from '@webapp/utils/functionUtils'

import { formatColumn, formatSection } from '@webapp/app/dataExport/utils/format'
import { isPanEuropean } from '@webapp/app/dataExport/utils/panEuropean'

const initialSelection = {
  countries: [],
  columns: [],
  // { param, label }
  variable: {},
}

export default () => {
  const { section = '', assessmentType } = useParams()
  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState([])

  const [selection, setSelection] = useState({ ...initialSelection })

  const { data: allCountries = [], dispatch: fetchCountries } = useGetRequest(`/api/countries`)

  const hasSelection = !!(selection.countries.length && selection.columns.length && selection.variable.param)

  const {
    data: results = {},
    dispatch: fetchResults,
    setState: setResultState,
    loading: resultsLoading,
  } = useGetRequest(`/api/export/${assessmentType}/${snake(formatSection(section, assessmentType))}`, {
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

  // If assessmentType (panEuropean -> FRA2020 -> panEuropean) changes,
  // reset countries
  useEffect(() => {
    setSelection({ ...initialSelection })
  }, [assessmentType])

  useEffect(() => {
    if (section && hasSelection) {
      throttle(fetchResults, `fetchDataExportResults`, 800)()
    }
  }, [selection.countries, selection.columns, selection.variable])

  const setSelectionCountries = (value) => setSelection({ ...selection, countries: value })
  const setSelectionColumns = (value) => setSelection({ ...selection, columns: value })
  const setSelectionVariable = (value) => setSelection({ ...selection, variable: value })

  // Handle pan european countries
  // const isPaneuropean = (country) => country.panEuropean
  const isPanEuropeanAssessment = assessmentType === 'panEuropean'
  const panEuropeanCountries = allCountries.filter(isPanEuropean)
  const countries = isPanEuropeanAssessment ? panEuropeanCountries : allCountries

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
