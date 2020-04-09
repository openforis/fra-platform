import React from 'react'
import PropTypes from 'prop-types'

import * as BasePaths from '@webapp/main/basePaths'

import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'
import { useCountryIso, useI18n, usePrintView, useUserInfo } from '@webapp/components/hooks'

const CellOdpHeader = (props) => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const [printView] = usePrintView()

  const { datum, sectionName } = props
  const { name, year, type, draft, odpId } = datum
  const label = name || year
  const odp = type === 'odp'

  const className = odp && !printView ? 'odp-header-cell' : 'fra-table__header-cell'

  return (
    <th className={className}>
      {odp && !printView ? (
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
