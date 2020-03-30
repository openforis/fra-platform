import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'

import { debounce } from '@webapp/utils/functionUtils'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import usePostRequest from '@webapp/components/hooks/usePostRequest'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useOnUpdate from '@webapp/components/hooks/useOnUpdate'
import * as autosave from '@webapp/app/components/autosave/actions'

const getUrl = (countryIso, section, name) => `/api/country/descriptions/${countryIso}/${section}/${name}`
const getData = name => R.pathOr(null, [name, 'content'])

export default (name, section, template) => {
  const dispatch = useDispatch()
  const countryIso = useCountryIso()

  // ====== data read
  const { data = template || null, setState, loading, dispatch: fetchData } = useGetRequest(
    getUrl(countryIso, section, name)
  )
  // ====== data update
  const { dispatch: postData, loaded: postDataLoaded } = usePostRequest(getUrl(countryIso, section, name), {
    content: getData(name)(data),
  })

  const onChange = content => {
    dispatch(autosave.start)
    setState({ data: { [name]: { content } } })
    debounce(postData, 'postDescriptionData', 800)()
  }

  // on mount fetch data
  useEffect(fetchData, [section, countryIso])

  // on post data loaded, dispatch autosave complete
  useOnUpdate(() => {
    dispatch(autosave.complete)
  }, [postDataLoaded])

  return {
    value: getData(name)(data),
    onChange,
    loading,
  }
}
