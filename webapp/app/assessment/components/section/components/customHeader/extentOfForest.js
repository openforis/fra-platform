import React from 'react'
import PropTypes from 'prop-types'

import * as BasePaths from '@webapp/main/basePaths'

import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'

const ExtentOfForest = props => {
  const { sectionName, disabled } = props

  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  if (!userInfo) {
    return null
  }

  return (
    <>
      <Link
        className={`btn btn-primary no-print${disabled ? ' disabled' : ''}`}
        to={BasePaths.getOdpLink(countryIso, sectionName)}
        style={{ marginRight: 16 }}
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
      <hr className="no-print" />
    </>
  )
}

ExtentOfForest.propTypes = {
  sectionName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default ExtentOfForest
