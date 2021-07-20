import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
// @ts-ignore
import * as snake from 'to-snake-case'
import * as Assessment from '@common/assessment/assessment'
import { throttle } from '@webapp/utils/functionUtils'
import { formatColumn, formatSection } from '@webapp/app/dataExport/utils/format'
import { useAssessmentType, useCountries, useCountriesPanEuropean, useRegions } from '@webapp/store/app'
import { useCountryIso, useGetRequest } from '@webapp/components/hooks'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { useSelector } from 'react-redux'
import * as UiState from '@webapp/store/ui/state'
import { __MIN_COUNTRIES__ } from '@webapp/pages/AssessmentHome/FraHome/components/CountrySelector'

const initialSelection: any = {
  countries: [],
  columns: [],
  variable: {},
}
export default () => {
  const { section }: any = useParams()
  const countryIso = useCountryIso()
  const regions: any = useRegions()
  const assessmentType = useAssessmentType()
  const isPanEuropean = Assessment.isTypePanEuropean(assessmentType)
  let countries = isPanEuropean ? useCountriesPanEuropean() : useCountries()
  const selectedCountries: any = useSelector(UiState.getSelectedCountries)

  if (!isPanEuropean && selectedCountries.length >= __MIN_COUNTRIES__) {
    countries = countries.filter(({ countryIso: _countryIso }: any) => selectedCountries.includes(_countryIso))
  }

  const isRegion = regions.map((region: any) => region.regionCode).includes(countryIso)

  const countriesFiltered = isRegion
    ? countries.filter((country: any) => country.regionCodes.includes(countryIso))
    : countries
  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState([])
  const [columnsAlwaysExport, setColumnsAlwaysExport] = useState([])
  const [selection, setSelection] = useState({ ...initialSelection })
  const hasSelection = !!(selection.countries.length && selection.columns.length && (selection.variable as any).param)
  const {
    data: results = {},
    dispatch: fetchResults,
    setState: setResultState,
    loading: resultsLoading,
  } = useGetRequest(`/api/export/${assessmentType}/${snake(formatSection(section, assessmentType))}`, {
    params: {
      columns: [...columnsAlwaysExport, ...selection.columns.map(({ param }: any) => formatColumn(param, section))],
      countries: selection.countries.map(({ param }: any) => param),
      variables: [(selection.variable as any).param],
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
  const setSelectionCountries = (value: any) => setSelection({ ...selection, countries: value })
  const setSelectionColumns = (value: any) => setSelection({ ...selection, columns: value })
  const setSelectionVariable = (value: any) => setSelection({ ...selection, variable: value })
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
