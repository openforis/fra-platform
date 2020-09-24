import './countryListDownload.less'
import React from 'react'
import { useSelector } from 'react-redux'

import * as Country from '@common/country/country'
import { isAdministrator } from '@common/countryRole'
import { getRelativeDate } from '@webapp/utils/relativeDate'

import { CSVLink } from 'react-csv'
import Icon from '@webapp/components/icon'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'

import * as CountryState from '@webapp/app/country/countryState'

const CountryListDownload = () => {
  const userInfo = useUserInfo()
  if (!isAdministrator(userInfo)) {
    return null
  }

  const i18n = useI18n()
  const countries = useSelector(CountryState.getCountriesList)

  const data = countries.map((country) => ({
    name: Country.getListName(i18n.language)(country),
    status: i18n.t(`assessment.status.${Country.getFra2020Assessment(country)}.label`),
    edited: getRelativeDate(Country.getLastEdit(country), i18n) || i18n.t('audit.notStarted'),
    deskStudy: i18n.t(`yesNoTextSelect.${Country.isFra2020DeskStudy(country) ? 'yes' : 'no'}`),
  }))

  const headers = [
    { label: i18n.t('admin.country'), key: 'name' },
    { label: i18n.t('countryListing.fra2020'), key: 'status' },
    { label: i18n.t('audit.edited'), key: 'edited' },
    { label: i18n.t('assessment.deskStudy'), key: 'deskStudy' },
  ]

  return (
    <div className="country-selection-list__download">
      <CSVLink className="btn-s btn-primary" target="_blank" filename="FRA-Countries.csv" data={data} headers={headers}>
        <Icon className="icon-sub icon-white" name="hit-down" />
        CSV
      </CSVLink>
    </div>
  )
}

export default CountryListDownload
