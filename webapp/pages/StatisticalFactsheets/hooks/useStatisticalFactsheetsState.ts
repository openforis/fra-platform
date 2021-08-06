import { useEffect } from 'react'

import useGetRequest from '@webapp/components/hooks/useGetRequest'

import { useSelector } from 'react-redux'
import { __MIN_COUNTRIES__ } from '@webapp/pages/AssessmentHome/FraHome/components/CountrySelector'
import { Areas } from '@core/country'
import * as UiState from '@webapp/store/ui/state'
import * as APIUtils from '../utils/apiUtils'

export default (section: any, level: any) => {
  const url = APIUtils.getUrl()
  const selectedCountries = useSelector(UiState.getSelectedCountries)

  // If we are on 'Global' view and we have filtered countries
  const _level = Areas.isISOGlobal(level) && selectedCountries.length >= __MIN_COUNTRIES__ ? selectedCountries : level
  const params = APIUtils.getParams(section, _level)

  const { data, dispatch: fetchData, loaded } = useGetRequest(url, {
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
