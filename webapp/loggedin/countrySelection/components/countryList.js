import React from 'react'
import * as R from 'ramda'
import { CSVLink } from 'react-csv'

import Icon from '@webapp/components/icon'
import CountryListRoleSection from '@webapp/loggedin/countrySelection/components/countryListRoleSection'

import { isAdministrator } from '@common/countryRole'
import { getRelativeDate } from '@webapp/utils/relativeDate'

const CountryList = ({ isOpen, countries, userInfo, ...props }) => {
  const roleCountriesPair = R.toPairs(countries)
  const { getCountryName, i18n } = props

  return (
    <div className="nav__country-list">
      {
        isAdministrator(userInfo) &&
        <div className="nav__country-list-download">
          <CSVLink
            className="btn-s btn-primary"
            target="_blank"
            filename="FRA-Countries.csv"
            data={
              R.pipe(
                R.map(
                  ([role, roleCountries]) =>
                    R.map(country => ({
                      name: getCountryName(country.countryIso, i18n.language),
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

      <div className="nav__country-list-content">
        {
          R.map(
            ([role, roleCountries]) =>
              <CountryListRoleSection
                {...props}
                key={role}
                role={role}
                roleCountries={roleCountries}
              />
            , roleCountriesPair
          )
        }
      </div>
    </div>
  )
}

export default CountryList
