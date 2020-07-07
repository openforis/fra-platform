import { useEffect } from 'react'

import useGetRequest from '@webapp/components/hooks/useGetRequest'

import * as APIUtils from '../utils/apiUtils'

export default (section, levelIso) => {
  const url = APIUtils.getUrl(levelIso)
  const params = APIUtils.getParams(section)

  const { data, dispatch: fetchData, loaded } = useGetRequest(url, {
    params,
  })

  useEffect(() => {
    fetchData()
  }, [levelIso])

  return {
    data,
    loaded,
  }
}
