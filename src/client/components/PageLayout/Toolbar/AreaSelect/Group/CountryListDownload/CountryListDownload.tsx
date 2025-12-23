import './CountryListDownload.scss'
import React from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { Dates } from 'utils/dates'

import { useCountries } from 'client/store/area/hooks/countries'
import { useAssessmentRouteParams } from 'client/hooks/routeParams'
import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const formatDate = (date?: string): string => (date ? Dates.format(Dates.parseISO(date), 'dd MMMM yyyy') : '')

const CountryListDownload: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName } = useAssessmentRouteParams()
  const countries = useCountries()
  const className = useButtonClassName({ iconName: 'hit-down', label: 'CSV' })

  const data = countries.map((country) => {
    const status = Areas.getStatus(country)

    return {
      name: t(`area.${country.countryIso}.listName`),
      countryIso: country.countryIso,
      status: t(`assessment.status.${status}.label`),
      lastEdit: formatDate(country.lastEdit),
      lastInReview: formatDate(country.lastInReview),
      lastInApproval: formatDate(country.lastInApproval),
      lastInAccepted: formatDate(country.lastInAccepted),
      deskStudy: t(`yesNoTextSelect.${country.props.deskStudy ? 'yes' : 'no'}`),
    }
  })

  const headers = [
    { label: t('common.country'), key: 'name' },
    { label: t('common.countryCode'), key: 'countryIso' },
    { label: t('common.status'), key: 'status' },
    { label: t('audit.edited'), key: 'lastEdit' },
    { label: t('common.submittedToReview'), key: 'lastInReview' },
    { label: t('common.submittedForApproval'), key: 'lastInApproval' },
    { label: t('common.accepted'), key: 'lastInAccepted' },
    { label: t('assessment.deskStudy'), key: 'deskStudy' },
  ]

  return (
    <div className="area-select__country-download">
      <CSVLink
        className={className}
        data={data}
        filename={`${assessmentName}-Countries.csv`}
        headers={headers}
        target="_blank"
      >
        <Icon name="hit-down" />
        CSV
      </CSVLink>
    </div>
  )
}

export default CountryListDownload
