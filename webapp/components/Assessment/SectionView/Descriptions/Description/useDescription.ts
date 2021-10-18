import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { debounce } from '@webapp/utils/functionUtils'

import { useCountryIso, useGetRequest, useOnUpdate, usePostRequest } from '@webapp/hooks'
import { AutosaveActions } from '@webapp/store/autosave'

type DescriptionState = {
  loading: boolean
  onChange: (value: string) => void
  value: string
}

export default (name: string, section: string, template: string): DescriptionState => {
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const canPostData = useRef(false)
  const url = `/api/country/descriptions/${countryIso}/${section}/${name}`

  // ====== data read
  const { data = template || null, setState, loading, dispatch: fetchData } = useGetRequest(url)

  // ====== data update
  const { dispatch: postData, loaded: postDataLoaded } = usePostRequest(url, { content: data })

  const onChange = (content: string) => {
    dispatch(AutosaveActions.autoSaveStart())
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
    dispatch(AutosaveActions.autoSaveComplete())
  }, [postDataLoaded])

  return {
    value: data,
    onChange,
    loading,
  }
}
