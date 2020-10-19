import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import snake from 'to-snake-case'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { throttle } from '@webapp/utils/functionUtils'

import { formatColumn, formatSection } from '@webapp/app/dataExport/utils/format'
import Assessment from '@common/assessment/assessment'
import { Country } from '@common/country'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import * as CountryState from '@webapp/app/country/countryState'
import { fetchRegionList } from '@webapp/app/country/actions'

const initialSelection = {
  countries: [],
  columns: [],
  // { param, label }
  variable: {},
}

export default () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const dispatch = useDispatch()
  const { assessmentType, section } = useParams()
  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState([])
  const [columnsAlwaysExport, setColumnsAlwaysExport] = useState([])

  const [selection, setSelection] = useState({ ...initialSelection })
  const hasRegions = useSelector(CountryState.hasRegions)
  if (!hasRegions) {
    dispatch(fetchRegionList())
  }
  const regions = useSelector(CountryState.getRegions)
  const countryListUrl = `/api/countries/${regions.includes(countryIso) ? countryIso : ''}`
  const { data: allCountries = [], dispatch: fetchCountries } = useGetRequest(countryListUrl)

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

  // Sort countries by listname
  const _getListName = (_countryIso) => i18n.t(`area.${_countryIso}.listName`)
  let countries = allCountries.sort((country1, country2) =>
    _getListName(country1.countryIso) > _getListName(country2.countryIso) ? 1 : -1
  )

  if (Assessment.isTypePanEuropean(assessmentType)) countries = countries.filter(Country.isPanEuropean)

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
