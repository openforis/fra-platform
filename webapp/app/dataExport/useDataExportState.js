import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useGetRequest from '@webapp/components/hooks/useGetRequest'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'

export default () => {
  const { section, assessmentType } = useParams()
  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState('')

  const [selection, setSelection] = useState({
    countries: [],
    columns: [],
    variable: '',
  })

  const { data: countries = [], dispatch: fetchCountries } = useGetRequest(`/api/countries`)

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    setSelection({
      ...selection,
      variable: '',
      columns: [],
    })

    if (assessmentType && section) {
      const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, section)
      const rowsExport = TableSpec.getRowsExport(tableSpec)
      setVariables(rowsExport)
    }

    setColumns([])
  }, [section])

  const setSelectionCountries = (value) => setSelection({ ...selection, countries: value })
  const setSelectionColumns = (value) => setSelection({ ...selection, columns: value })
  const setSelectionVariable = (value) => setSelection({ ...selection, variable: value })

  return { countries, columns, selection, variables, setSelectionCountries, setSelectionColumns, setSelectionVariable }
}
