import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import snake from 'to-snake-case'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { throttle } from '@webapp/utils/functionUtils'

import { formatColumn, formatSection } from '@webapp/app/dataExport/utils/format'
import Assessment from '@common/assessment/assessment'
import { Area, Country } from '@common/country'
import { useCountryIso, useI18n } from '@webapp/components/hooks'

const initialSelection = {
  countries: [],
  columns: [],
  // { param, label }
  variable: {},
}

export default () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const { assessmentType, section } = useParams()
  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState([])
  const [columnsAlwaysExport, setColumnsAlwaysExport] = useState([])

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
      columns: [...columnsAlwaysExport, ...selection.columns.map(({ param }) => formatColumn(param, section))],
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
      setVariables(TableSpec.getRowsExport(tableSpec))
      setColumns(TableSpec.getColumnsExport(tableSpec))
      setColumnsAlwaysExport(TableSpec.getColumnsExportAlways(tableSpec))
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

  // Can't use Country.getListName here - the data struct is different (no subkeys)
  const _formatLanguage = ([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`
  const _getListName = (country, language) => country[`listName${_formatLanguage(language)}`]
  // Sort countries by listname
  let countries = allCountries.sort((country1, country2) => {
    return _getListName(country1, i18n.language) > _getListName(country2, i18n.language) ? 1 : -1
  })

  if (Assessment.isTypePanEuropean(assessmentType)) countries = countries.filter(Country.isPanEuropean)
  if (Area.isISORegion(countryIso))
    countries = countries.filter((country) => Country.getRegionIso(country) === countryIso)

  return {
    results,
    resultsLoading,
    countries,
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
