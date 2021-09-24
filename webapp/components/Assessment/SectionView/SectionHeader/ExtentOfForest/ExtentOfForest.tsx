import React from 'react'
import { Link } from 'react-router-dom'

import { FRA } from '@core/assessment'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n, useUserInfo } from '@webapp/hooks'

import Icon from '@webapp/components/icon'
import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { sectionName, disabled } = props

  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  if (!userInfo) {
    return null
  }
  // TODO: check this works
  return (
    <>
      <Link
        className={`btn btn-primary no-print${disabled ? ' disabled' : ''}`}
        to={BasePaths.getOdpLink(countryIso, FRA.type, sectionName)}
        style={{ marginRight: 16 }}
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
      <hr className="no-print" />
    </>
  )
}

export default ExtentOfForest
