import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useGetRequest from '@webapp/components/hooks/useGetRequest'

export default () => {
  const { section } = useParams()
  const [variables, setVariables] = useState([])
  const [columns, setColumns] = useState('')

  const [selection, setSelection] = useState({
    countries: [],
    columns: [],
    variable: '',
  })

  const url = `/api/country/all`
  const { data: countries, dispatch: fetchCountries } = useGetRequest(url)

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    setSelection({
      ...selection,
      variable: '',
      columns: [],
    })
  }, [section])

  const setSelectionCountries = (value) => setSelection({ ...selection, countries: [...selection.countries, value] })
  const setSelectionColumns = (value) => setSelection({ ...selection, columns: [...selection.columns, value] })
  const setSelectionVariable = (value) => setSelection({ ...selection, variable: value })

  return { countries, columns, selection, variables, setSelectionCountries, setSelectionColumns, setSelectionVariable }
}
