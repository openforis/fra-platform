import './countryListDownload.less'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { isAdministrator } from '@common/countryRole'
import { getRelativeDate } from '@webapp/utils/relativeDate'

import { CSVLink } from 'react-csv'
import Icon from '@webapp/components/icon'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'

import * as CountryState from '@webapp/country/countryState'

import { getCountryName } from '@webapp/country/actions'

const CountryListDownload = () => {

  const userInfo = useUserInfo()
  if (!isAdministrator(userInfo)) {
    return null
  }

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countries = useSelector(CountryState.getCountries)

  const data = R.pipe(
    R.values,
    R.flatten,
    R.map(
      country => ({
        name: dispatch(getCountryName(country.countryIso, i18n.language)),
        status: i18n.t(`assessment.status.${country.fra2020Assessment}.label`),
        edited: getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted'),
        deskStudy: i18n.t(`yesNoTextSelect.${R.propEq('fra2020DeskStudy', true, country) ? 'yes' : 'no'}`)
      })
    ),
  )(countries)

  const headers = [
    { label: i18n.t('admin.country'), key: 'name' },
    { label: i18n.t('countryListing.fra2020'), key: 'status' },
    { label: i18n.t('audit.edited'), key: 'edited' },
    { label: i18n.t('assessment.deskStudy'), key: 'deskStudy' },
  ]

  return (
    <div className="country-selection-list__download">
      <CSVLink
        className="btn-s btn-primary"
        target="_blank"
        filename="FRA-Countries.csv"
        data={data}
        headers={headers}>
        <Icon className="icon-sub icon-white" name="hit-down"/>CSV
      </CSVLink>
    </div>
  )
}

export default CountryListDownload
