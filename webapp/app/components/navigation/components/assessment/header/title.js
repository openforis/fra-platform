import React from 'react'
import PropTypes from 'prop-types'

import { useCountryIso, useI18n } from '@webapp/components/hooks'

import { Area } from '@common/country'

const Title = (props) => {
  const { type, deskStudy } = props

  const i18n = useI18n()
  const countryIso = useCountryIso()

  return (
    <div>
      {i18n.t(`assessment.${type}`)}
      {Area.isISOCountry(countryIso) ? '' : ` - ${i18n.t('common.dataExport')}`}
      {deskStudy && <div className="desk-study">({i18n.t('assessment.deskStudy')})</div>}
    </div>
  )
}

Title.defaultProps = {
  deskStudy: false,
}
Title.propTypes = {
  type: PropTypes.string.isRequired,
  deskStudy: PropTypes.bool,
}

export default Title
