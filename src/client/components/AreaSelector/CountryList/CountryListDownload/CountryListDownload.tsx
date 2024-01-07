import './countryListDownload.scss'
import React from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { Areas } from 'meta/area'
import { Users } from 'meta/user'

import { useCountries } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import Icon from 'client/components/Icon'

const formatDate = (date?: string): string => (date ? Dates.format(Dates.parseISO(date), 'dd MMMM yyyy') : '')

const CountryListDownload: React.FC = () => {
  const { t } = useTranslation()
  const user = useUser()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countries = useCountries()

  if (!Users.isAdministrator(user)) return null

  const data = countries.map((country) => {
    const status = Areas.getStatus(country)

    return {
      name: t(`area.${country.countryIso}.listName`),
      status: t(`assessment.status.${status}.label`),
      lastEdit: formatDate(country.lastEdit),
      lastInReview: formatDate(country.lastInReview),
      lastForApproval: formatDate(country.lastForApproval),
      lastAccepted: formatDate(country.lastAccepted),
      deskStudy: t(`yesNoTextSelect.${country.props.deskStudy ? 'yes' : 'no'}`),
    }
  })

  const headers = [
    { label: t('common.country'), key: 'name' },
    { label: `${t(`${assessment.props.name}.labels.short`)} ${cycle.name}`, key: 'status' },
    { label: t('common.lastEdit'), key: 'lastEdit' },
    { label: t('common.lastInReview'), key: 'lastInReview' },
    { label: t('common.lastForApproval'), key: 'lastForApproval' },
    { label: t('common.lastAccepted'), key: 'lastAccepted' },
    { label: t('assessment.deskStudy'), key: 'deskStudy' },
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
