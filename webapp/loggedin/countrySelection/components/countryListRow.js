import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as R from 'ramda'

import { getRelativeDate } from '@webapp/utils/relativeDate'

import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import { getCountryName } from '@webapp/country/actions'

const CountryListRow = props => {

  const { country } = props

  const i18n = useI18n()
  const countryIso = useCountryIso()
  const dispatch = useDispatch()
  const countryNameRef = useRef(null)

  const selected = R.equals(countryIso, country.countryIso)

  useEffect(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
  }, [])

  return (
    <Link
      to={`/country/${country.countryIso}/`}
      className={`nav__country-list-row${selected ? ' selected' : ''}`}>

        <span className="nav__country-list-primary-col" ref={countryNameRef}>
          {
            dispatch(getCountryName(country.countryIso, i18n.language))
          }
        </span>

      {
        country.fra2020Assessment ?
          <span className="nav__country-list-secondary-col">
              <div className={`status-${country.fra2020Assessment}`}/>
            {
              i18n.t(`assessment.status.${country.fra2020Assessment}.label`)
            }
            </span>
          : null
      }

      <span className="nav__country-list-secondary-col">
          {
            getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted')
          }
        </span>
    </Link>
  )
}

CountryListRow.propTypes = {
  country: PropTypes.object.isRequired,
}

export default CountryListRow
