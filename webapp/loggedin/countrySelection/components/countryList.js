import './countryList.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'

import { isAdministrator } from '@common/countryRole'
import { getRelativeDate } from '@webapp/utils/relativeDate'

import { CSVLink } from 'react-csv'
import Icon from '@webapp/components/icon'
import CountryListRoleSection from '@webapp/loggedin/countrySelection/components/countryListRoleSection'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'

import { getCountryName } from '@webapp/country/actions'

const CountryList = props => {
  const { countries } = props
  const roleCountriesPair = R.toPairs(countries)

  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  return (
    <div className="country-selection-list">
      {
        isAdministrator(userInfo) &&
        <div className="country-selection-list-download">
          <CSVLink
            className="btn-s btn-primary"
            target="_blank"
            filename="FRA-Countries.csv"
            data={
              R.pipe(
                R.map(
                  ([_, roleCountries]) =>
                    R.map(country => ({
                      name: dispatch(getCountryName(country.countryIso, i18n.language)),
                      status: i18n.t(`assessment.status.${country.fra2020Assessment}.label`),
                      edited: getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted'),
                      deskStudy: i18n.t(`yesNoTextSelect.${R.propEq('fra2020DeskStudy', true, country) ? 'yes' : 'no'}`)
                    }), roleCountries)
                ),
                R.flatten
              )(roleCountriesPair)
            }
            headers={[
              { label: i18n.t('admin.country'), key: 'name' },
              { label: i18n.t('countryListing.fra2020'), key: 'status' },
              { label: i18n.t('audit.edited'), key: 'edited' },
              { label: i18n.t('assessment.deskStudy'), key: 'deskStudy' },
            ]}>
            <Icon className="icon-sub icon-white" name="hit-down"/>CSV
          </CSVLink>
        </div>
      }

      <div className="country-selection-list__content">
        {
          roleCountriesPair.map(([role, roleCountries]) =>
            <CountryListRoleSection
              key={role}
              i18n={i18n}
              role={role}
              roleCountries={roleCountries}
            />
          )
        }
      </div>
    </div>
  )
}

CountryList.propTypes = {
  countries: PropTypes.object.isRequired,
}

export default CountryList
