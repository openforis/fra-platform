import { useEffect } from 'react'

import useGetRequest from '@webapp/components/hooks/useGetRequest'
import { throttle } from '@webapp/utils/functionUtils'

import * as APIUtils from '../utils/apiUtils'

export default (section, levelIso) => {
  const url = APIUtils.getUrl(levelIso)
  const params = APIUtils.getParams(section)

  const { data, dispatch: fetchData, loaded } = useGetRequest(url, {
    params,
  })

  useEffect(() => {
    throttle(fetchData, `fetchStatisticalFactsheetResults-${section}-${levelIso}`, 800)()
  }, [levelIso])

  return {
    data,
    loaded,
  }
}
