import { useEffect } from 'react'

import useGetRequest from '@webapp/components/hooks/useGetRequest'

import * as APIUtils from '../utils/apiUtils'

export default (section, level) => {
  const url = APIUtils.getUrl()
  const params = APIUtils.getParams(section, level)

  const { data, dispatch: fetchData, loaded } = useGetRequest(url, {
    params,
  })

  useEffect(() => {
    fetchData()
  }, [level])

  return {
    data,
    loaded,
  }
}
