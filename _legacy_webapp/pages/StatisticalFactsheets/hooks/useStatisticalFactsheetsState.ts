import { useEffect } from 'react'

import { Areas } from '@core/country'
import { Objects } from '@core/utils'
import { useHomeCountriesFilter } from '../../../store/page/home'
import { useGetRequest } from '../../../hooks'
import * as APIUtils from '../utils/apiUtils'

export default (section: any, level: any) => {
  const url = APIUtils.getUrl()
  const countriesFilter = useHomeCountriesFilter()

  // If we are on 'Global' view and we have filtered countries
  const _level = Areas.isISOGlobal(level) && !Objects.isEmpty(countriesFilter) ? countriesFilter : level
  const params = APIUtils.getParams(section, _level)

  const {
    data,
    dispatch: fetchData,
    loaded,
  } = useGetRequest(url, {
    params,
  })

  useEffect(() => {
    fetchData()
  }, [_level])

  return {
    data,
    loaded,
  }
}
