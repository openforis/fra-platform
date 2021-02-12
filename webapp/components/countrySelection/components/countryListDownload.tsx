import './countryListDownload.less'
import React from 'react'
import * as Country from '@common/country/country'
import { isAdministrator } from '@common/countryRole'
import { getRelativeDate } from '@webapp/utils/relativeDate'
import { CSVLink } from 'react-csv'
import Icon from '@webapp/components/icon'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'
import { useUserCountriesAsList } from '@webapp/store/user/hooks'

const CountryListDownload = () => {
  const userInfo = useUserInfo()
  if (!isAdministrator(userInfo)) {
    return null
  }
  const i18n = useI18n()
  const userCountriesAsList = useUserCountriesAsList()
  const data = userCountriesAsList.map((country: any) => ({
    name: (i18n as any).t(`area.${country.countryIso}.listName`),
    status: (i18n as any).t(`assessment.status.${Country.getFra2020Assessment(country)}.label`),
    edited: getRelativeDate(Country.getLastEdit(country), i18n) || (i18n as any).t('audit.notStarted'),
    deskStudy: (i18n as any).t(`yesNoTextSelect.${Country.isFra2020DeskStudy(country) ? 'yes' : 'no'}`),
  }))
  const headers = [
    { label: (i18n as any).t('admin.country'), key: 'name' },
    { label: (i18n as any).t('countryListing.fra2020'), key: 'status' },
    { label: (i18n as any).t('audit.edited'), key: 'edited' },
    { label: (i18n as any).t('assessment.deskStudy'), key: 'deskStudy' },
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
