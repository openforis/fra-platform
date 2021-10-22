import React from 'react'

import { FRA } from '@core/assessment'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n } from '@webapp/hooks'

import Icon from '@webapp/components/icon'
import { useUserInfo } from '@webapp/store/user'
import { useHistory } from 'react-router'
import axios, { AxiosResponse } from 'axios'
import { ODP } from '@core/odp'
import { ApiEndPoint } from '@common/api/endpoint'
import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { sectionName, disabled } = props

  const history = useHistory()

  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  if (!userInfo) {
    return null
  }

  const handleClick = async () => {
    const {
      data: { odp },
    } = await axios.post<undefined, AxiosResponse<{ odp: ODP }>>(ApiEndPoint.OriginalDataPoint.many(), {
      countryIso,
    })
    history.push(BasePaths.getOdpLink(countryIso, FRA.type, sectionName, odp.id))
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary no-print${disabled ? ' disabled' : ''}`}
        onClick={handleClick}
        style={{ marginRight: 16 }}
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </button>
      <hr className="no-print" />
    </>
  )
}

export default ExtentOfForest
