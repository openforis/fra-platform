import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { TFunction } from 'i18next'

import { Areas, Country, CountryIso, Global, RegionCode } from 'meta/area'
import { RoleName, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useCountries } from 'client/store/area'
import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector'
import { useUser } from 'client/store/user'
import CountryListRow from 'client/components/AreaSelector/CountryList/CountryListRow'
import { checkMatch } from 'client/utils'

import { useToggleMode } from './hooks/useToggleMode'

type Props = {
  countryISOs: Array<CountryIso>
  onElementSelect: (countryIso: CountryIso | Global | RegionCode) => void
  role: RoleName | string
  selectedValue: CountryIso | Global | RegionCode
  query: string
}

const matchRegion = (props: { country: Country; t: TFunction; query: string }): boolean => {
  const { country, t, query } = props

  return country.regionCodes.some((regionCode) => {
    const regionLabel = t(Areas.getTranslationKey(regionCode))
    return checkMatch(regionLabel, query)
  })
}

const CountryListRoleSection: React.FC<Props> = (props: Props) => {
  const { countryISOs, onElementSelect, role, selectedValue, query } = props

  const { t } = useTranslation()
  const countries = useCountries()
  const user = useUser()
  const expanded = useIsAreaSelectorExpanded()
  const toggleMode = useToggleMode()

  const admin = Users.isAdministrator(user)

  return (
    <div className="country-selection-list__roleSection">
      {role !== UserRoles.noRole.role && (
        <div className={classNames('country-selection-list__header', { admin, expanded })}>
          <div>{t(Users.getI18nRoleLabelKey(role))}</div>
          <div>{t('common.status')}</div>

          {expanded && (
            <>
              <div>{t('audit.edited')}</div>
              <div>{t('common.submittedToReview')}</div>
              <div>{t('common.submittedForApproval')}</div>
              <div>{t('common.accepted')}</div>
            </>
          )}
          {!expanded && <div>{t('common.updated')}</div>}

          {admin && (
            <button
              className="btn btn-s btn-transparent country-selection-list__btn-show-more"
              onClick={(event) => {
                event.stopPropagation()
                toggleMode()
              }}
              type="button"
            >
              {expanded ? t('common.showLess') : t('common.showMore')}
            </button>
          )}
        </div>
      )}

      {countryISOs?.map((countryIso) => {
        const countryLabel = t(Areas.getTranslationKey(countryIso))
        const country = countries.find((c) => c.countryIso === countryIso)
        const matchCountry = checkMatch(countryLabel, query) || matchRegion({ country, query, t })

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
