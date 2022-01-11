import './countryListDownload.scss'
import React from 'react'
import { CSVLink } from 'react-csv'

import * as Country from '@common/country/country'

import Icon from '@webapp/components/icon'
import { useTranslation } from 'react-i18next'
import { Dates } from '@client/utils'
import { useUser } from '@client/store/user'
import { Users } from '@meta/user'

// TODO

const CountryListDownload: React.FC = () => {
  const user = useUser()
  const { i18n } = useTranslation()
  const userCountriesAsList: Array<Country> = [] // useUserCountriesAsList()

  if (!Users.isAdministrator(user)) return null

  const data = userCountriesAsList.map((country: any) => ({
    name: i18n.t(`area.${country.countryIso}.listName`),
    status: i18n.t(`assessment.status.${Country.getFra2020Assessment(country)}.label`),
    edited: Dates.getRelativeDate(Country.getLastEdit(country), i18n) || i18n.t('audit.notStarted'),
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
