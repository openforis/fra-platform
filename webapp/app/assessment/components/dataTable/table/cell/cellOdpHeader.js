import React from 'react'
import PropTypes from 'prop-types'

import * as BasePaths from '@webapp/main/basePaths'

import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'

import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const CellOdpHeader = props => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()

  const { datum, sectionName } = props
  const { name, year, type, draft, odpId } = datum
  const label = name || year
  const odp = type === 'odp'

  const className = odp && !isPrintingMode() ? 'odp-header-cell' : 'fra-table__header-cell'

  return (
    <th className={className}>
      {odp ? (
        <Tooltip text={i18n.t('nationalDataPoint.clickOnNDP')}>
          <Link className="link" to={BasePaths.getOdpLink(countryIso, sectionName, odpId)}>
            {draft && userInfo && <Icon className="icon-sub icon-margin-right" name="pencil" />}
            {label}
          </Link>
        </Tooltip>
      ) : (
        label
      )}
    </th>
  )
}

CellOdpHeader.propTypes = {
  datum: PropTypes.object.isRequired,
  sectionName: PropTypes.string.isRequired,
}

export default CellOdpHeader
