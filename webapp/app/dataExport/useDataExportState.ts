import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'to-s... Remove this comment to see the full error message
import snake from 'to-snake-case'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import Assessment from '@common/assessment/assessment'
import { throttle } from '@webapp/utils/functionUtils'
import { formatColumn, formatSection } from '@webapp/app/dataExport/utils/format'
import { useAssessmentType, useCountries, useCountriesPanEuropean, useRegions } from '@webapp/store/app'
import { useCountryIso, useGetRequest } from '@webapp/components/hooks'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'

const initialSelection = {
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'countries' implicitly h... Remove this comment to see the full error message
  countries: [],
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'columns' implicitly has... Remove this comment to see the full error message
  columns: [],
  variable: {},
}
export default () => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'section' does not exist on type '{}'.
  const { section } = useParams()
  const countryIso = useCountryIso()
  const regions = useRegions()
  const assessmentType = useAssessmentType()
  const countries = Assessment.isTypePanEuropean(assessmentType) ? useCountriesPanEuropean() : useCountries()
  const isRegion = (regions as any).map((region: any) => region.regionCode).includes(countryIso)
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
      columns: [...columnsAlwaysExport, ...selection.columns.map(({ param }) => formatColumn(param, section))],
      countries: selection.countries.map(({ param }) => param),
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
