import React from 'react'
import PropTypes from 'prop-types'

import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'

import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

const TableHeaderCell = props => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const { datum, section } = props
  const { name, type, draft, odpId } = datum
  const odp = type === 'odp'

  const className = odp && !isPrintingMode() ? 'odp-header-cell' : 'fra-table__header-cell'

  return (
    <th className={className}>
      {
        odp
          ? (
            <Tooltip
              text={i18n.t('nationalDataPoint.clickOnNDP')}>
              <Link
                className="link"
                to={`/country/${countryIso}/odp/${section}/${odpId}`}>
                {
                  draft &&
                  <Icon className="icon-sub icon-margin-right" name="pencil"/>
                }
                {
                  name
                }
              </Link>
            </Tooltip>
          ) : (
            name
          )
      }
    </th>
  )
}

TableHeaderCell.propTypes = {
  datum: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
}

export default TableHeaderCell
