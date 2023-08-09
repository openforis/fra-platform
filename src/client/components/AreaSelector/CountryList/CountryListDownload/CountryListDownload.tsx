import './countryListDownload.scss'
import React from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area'
import { Users } from 'meta/user'

import { useCountries } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useUser, useUserCountries } from 'client/store/user'
import Icon from 'client/components/Icon'
import { Dates } from 'client/utils'

const CountryListDownload: React.FC = () => {
  const { i18n } = useTranslation()
  const user = useUser()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countries = useCountries()
  const userCountryISOs = useUserCountries()

  if (!Users.isAdministrator(user)) return null

  const data = userCountryISOs.map((countryIso) => {
    const country = countries.find((c) => c.countryIso === countryIso)
    const { props, lastEdit } = country
    const status = Areas.getStatus(country)

    return {
      name: i18n.t(`area.${countryIso}.listName`),
      status: i18n.t(`assessment.status.${status}.label`),
      edited: lastEdit ? Dates.getRelativeDate(country.lastEdit, i18n) : i18n.t('audit.notStarted'),
      deskStudy: i18n.t(`yesNoTextSelect.${props.deskStudy ? 'yes' : 'no'}`),
    }
  })

  const headers = [
    { label: i18n.t('admin.country'), key: 'name' },
    { label: `${i18n.t(`${assessment.props.name}.labels.short`)} ${cycle.name}`, key: 'status' },
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
