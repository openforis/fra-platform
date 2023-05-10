import React from 'react'
import { useTranslation } from 'react-i18next'

import { i18n } from 'i18next'

import { Areas, Country, CountryIso, Global, RegionCode } from '@meta/area'
import { Assessments } from '@meta/assessment'
import { RoleName, Users } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { useAssessment, useCountries, useCycle } from '@client/store/assessment'
import { checkMatch } from '@client/utils'

import CountryListRow from '../CountryListRow'

type Props = {
  countryISOs: Array<CountryIso>
  onElementSelect: (countryIso: CountryIso | Global | RegionCode) => void
  role: RoleName | string
  selectedValue: CountryIso | Global | RegionCode
  query: string
}

const matchRegion = (props: { country: Country; i18n: i18n; query: string }): boolean => {
  const { country, i18n, query } = props

  return country.regionCodes.some((regionCode) => {
    const regionLabel = i18n.t(Areas.getTranslationKey(regionCode))
    return checkMatch(regionLabel, query)
  })
}

const CountryListRoleSection: React.FC<Props> = (props: Props) => {
  const { countryISOs, onElementSelect, role, selectedValue, query } = props

  const { i18n } = useTranslation()
  const countries = useCountries()
  const assessment = useAssessment()
  const cycle = useCycle()

  return (
    <div className="country-selection-list__section">
      {role !== UserRoles.noRole.role && (
        <div className="country-selection-list__header">
          <span className="country-selection-list__primary-col">{i18n.t<string>(Users.getI18nRoleLabelKey(role))}</span>
          <span className="country-selection-list__secondary-col">
            {`${i18n.t(Assessments.getShortLabel(assessment.props.name))} ${cycle.name}`}
          </span>
          <span className="country-selection-list__secondary-col">{i18n.t<string>('audit.edited')}</span>
        </div>
      )}

      {countryISOs?.map((countryIso) => {
        const countryLabel = i18n.t(Areas.getTranslationKey(countryIso))
        const country = countries.find((c) => c.countryIso === countryIso)
        const matchCountry = checkMatch(countryLabel, query) || matchRegion({ country, query, i18n })

        if (matchCountry) {
          return (
            <CountryListRow
              key={countryIso}
              role={role}
              country={{ countryIso }}
              onElementSelect={onElementSelect}
              selectedValue={selectedValue}
            />
          )
        }

        return null
      })}
    </div>
  )
}

export default CountryListRoleSection
