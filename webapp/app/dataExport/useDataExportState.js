import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import snake from 'to-snake-case'

import Assessment from '@common/assessment/assessment'
import { throttle } from '@webapp/utils/functionUtils'
import { formatColumn, formatSection } from '@webapp/app/dataExport/utils/format'

import { useAssessmentType, useCountries, useCountriesPanEuropean, useRegions } from '@webapp/store/app'

import { useCountryIso, useGetRequest } from '@webapp/components/hooks'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { useSelector } from 'react-redux'
import { HomeState } from '@webapp/store/ui'
import { __MIN_COUNTRIES__ } from '@webapp/pages/Assessment/AssessmentHome/FraHome/components/CountrySelector'

const initialSelection = {
  countries: [],
  columns: [],
  variable: {},
}

export default () => {
  const { section } = useParams()
  const countryIso = useCountryIso()
  const regions = useRegions()
  const assessmentType = useAssessmentType()
  const isPanEuropean = Assessment.isTypePanEuropean(assessmentType)
  let countries = isPanEuropean ? useCountriesPanEuropean() : useCountries()
  const selectedCountries = useSelector(HomeState.getSelectedCountries)

  if (!isPanEuropean && selectedCountries.length >= __MIN_COUNTRIES__) {
    countries = countries.filter(({ countryIso: _countryIso }) => selectedCountries.includes(_countryIso))
  }

  const isRegion = regions.map((region) => region.regionCode).includes(countryIso)
  const countriesFiltered = isRegion
    ? countries.filter((country) => country.regionCodes.includes(countryIso))
    : countries

  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState([])
  const [columnsAlwaysExport, setColumnsAlwaysExport] = useState([])

  const [selection, setSelection] = useState({ ...initialSelection })

  const hasSelection = !!(selection.countries.length && selection.columns.length && selection.variable.param)

  const {
    data: results = {},
    dispatch: fetchResults,
    setState: setResultState,
    loading: resultsLoading,
  } = useGetRequest(`/api/export/${assessmentType}/${snake(formatSection(section, assessmentType))}`, {
    params: {
      columns: [...columnsAlwaysExport, ...selection.columns.map(({ param }) => formatColumn(param, section))],
      countries: selection.countries.map(({ param }) => param),
      variables: [selection.variable.param],
    },
  })

  useEffect(() => {
    setSelection({
      ...selection,
      variable: {},
      columns: [],
    })
    setResultState([])

    if (assessmentType && section) {
      const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, section)
      setVariables(TableSpec.getRowsExport(tableSpec))
      setColumns(TableSpec.getColumnsExport(tableSpec))
      setColumnsAlwaysExport(TableSpec.getColumnsExportAlways(tableSpec))
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
    // Note: countryIso in this case is regionCode, but in the url the param it's 'countryIso'
    countries: countriesFiltered,
    columns,
    columnsAlwaysExport,
    selection,
    variables,
    hasSelection,
    setSelectionCountries,
    setSelectionColumns,
    setSelectionVariable,
  }
}
