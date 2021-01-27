import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { debounce } from '@webapp/utils/functionUtils'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import usePostRequest from '@webapp/components/hooks/usePostRequest'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useOnUpdate from '@webapp/components/hooks/useOnUpdate'
import * as autosave from '@webapp/app/components/autosave/actions'

export default (name: any, section: any, template: any) => {
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const canPostData = useRef(false)
  const url = `/api/country/descriptions/${countryIso}/${section}/${name}`

  // ====== data read
  const { data = template || null, setState, loading, dispatch: fetchData } = useGetRequest(url)

  // ====== data update
  const { dispatch: postData, loaded: postDataLoaded } = usePostRequest(url, { content: data })

  const onChange = (content: any) => {
    dispatch(autosave.start)
    canPostData.current = true
    setState({ data: content })
  }

  // on mount fetch data
  useEffect(fetchData, [section, countryIso])

  // on value update if canPostData is true, executes post request
  useEffect(() => {
    if (canPostData.current) {
      debounce(postData, `postDescriptionData-${section}-${name}`, 800)()
    }
  }, [data])

  // on post data loaded, dispatch autosave complete
  useOnUpdate(() => {
    dispatch(autosave.complete)
  }, [postDataLoaded])

  return {
    value: data,
    onChange,
    loading,
  }
}
