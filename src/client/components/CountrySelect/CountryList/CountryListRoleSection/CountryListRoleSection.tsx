import React from 'react'
import { useTranslation } from 'react-i18next'

import { i18n } from 'i18next'

import { Areas, Country, CountryIso } from '@meta/area'
import { CycleUuid } from '@meta/assessment'
import { RoleName, Users } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { useAssessment, useCountries, useCycle } from '@client/store/assessment'

import { checkMatch } from '../../utils/checkMatch'
import CountryListRow from '../CountryListRow'

type Props = {
  role: RoleName | string
  query: string
  countryISOs: Array<CountryIso>
  cycleUuid: CycleUuid
}

const matchRegion = (props: { country: Country; i18n: i18n; query: string }): boolean => {
  const { country, i18n, query } = props

  return country.regionCodes.some((regionCode) => {
    const regionLabel = i18n.t(Areas.getTranslationKey(regionCode))
    return checkMatch(regionLabel, query)
  })
}

const CountryListRoleSection: React.FC<Props> = (props: Props) => {
  const { role, countryISOs, query, cycleUuid } = props

  const { i18n } = useTranslation()
  const countries = useCountries()
  const assessment = useAssessment()
  const cycle = useCycle(cycleUuid)

  return (
    <div className="country-selection-list__section">
      {role !== UserRoles.noRole.role && (
        <div className="country-selection-list__header">
          <span className="country-selection-list__primary-col">{i18n.t<string>(Users.getI18nRoleLabelKey(role))}</span>
          <span className="country-selection-list__secondary-col uppercase">{`${assessment.props.name} ${cycle.name}`}</span>
          <span className="country-selection-list__secondary-col">{i18n.t<string>('audit.edited')}</span>
        </div>
      )}

      {countryISOs.map((countryIso) => {
        const countryLabel = i18n.t(Areas.getTranslationKey(countryIso))
        const country = countries.find((c) => c.countryIso === countryIso)
        const matchCountry = checkMatch(countryLabel, query) || matchRegion({ country, query, i18n })

        if (matchCountry) {
          return <CountryListRow cycleUuid={cycleUuid} key={countryIso} role={role} country={{ countryIso }} />
        }

        return null
      })}
    </div>
  )
}

export default CountryListRoleSection
