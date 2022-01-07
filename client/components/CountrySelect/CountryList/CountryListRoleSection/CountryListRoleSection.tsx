import React from 'react'
import { getRoleLabelKey, noRole } from '@common/countryRole'
import { useTranslation } from 'react-i18next'
import { useUser } from '@client/store/user'
import { Areas, CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { checkMatch } from '../../utils/checkMatch'
import CountryListRow from '../CountryListRow'

type Props = {
  role: string
  query?: string
  countryISOs: CountryIso[]
}

const CountryListRoleSection: React.FC<Props> = (props: Props) => {
  const { role, countryISOs, query } = props
  const { i18n } = useTranslation()
  const user = useUser()

  const countryListNameMatch = (countryIso: CountryIso) =>
    checkMatch(i18n.t(Areas.getTranslationKey(countryIso)), query)

  const countryRegionCodeMatch = (_countryIso: CountryIso) => false // TODO

  const renderRow = (countryIso: CountryIso) =>
    (user || !countryIso.startsWith('X')) && (countryListNameMatch(countryIso) || countryRegionCodeMatch(countryIso))

  return (
    <div className="country-selection-list__section">
      {role !== noRole.role && (
        <div className="country-selection-list__header">
          <span className="country-selection-list__primary-col">{i18n.t(getRoleLabelKey(role))}</span>
          <span className="country-selection-list__secondary-col">{i18n.t('countryListing.fra2020')}</span>
          <span className="country-selection-list__secondary-col">{i18n.t('audit.edited')}</span>
        </div>
      )}

      {countryISOs.map(
        (countryIso) =>
          renderRow(countryIso) && (
            <CountryListRow key={countryIso} assessmentType={AssessmentName.fra} role={role} country={{ countryIso }} />
          )
      )}
    </div>
  )
}

CountryListRoleSection.defaultProps = {
  query: '',
}

export default CountryListRoleSection
