import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { components, OptionProps } from 'react-select'
import classNames from 'classnames'

import { Areas } from 'meta/area/areas'
import { Users } from 'meta/user/users'
import { Dates } from 'utils/dates'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { useUser } from 'client/store/user/hooks/user'
import CountryStatusIndicator from 'client/components/CountryStatusIndicator'
import { OptionArea, OptionsGroupArea } from 'client/components/PageLayout/Toolbar/AreaSelect/types'

import { usePublishedAfterLabel } from './hooks/usePublishedAfterLabel'

type Props = OptionProps<OptionArea, boolean, OptionsGroupArea>

const Option: React.FC<Props> = (props) => {
  const { data } = props
  const { country, hidden, label } = data

  const { t } = useTranslation()
  const cycle = useCycle()
  const user = useUser()
  const expanded = useIsAreaSelectorExpanded()
  const publishedAfterLabel = usePublishedAfterLabel({ country })
  const formatDate = useCallback((date?: string): string => (date ? Dates.getRelativeDate(date, t) : '-'), [t])

  if (hidden) return null

  const withRole = country && Users.hasRoleInCountry({ countryIso: country.countryIso, cycle, user })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.Option {...props}>
      <div
        className={classNames('area-select__country-row', {
          withRole,
          expanded,
          withLastPublished: Boolean(publishedAfterLabel),
        })}
      >
        <div>{label}</div>

        {publishedAfterLabel && <div>{publishedAfterLabel}</div>}

        {withRole && (
          <>
            <div>
              <CountryStatusIndicator status={Areas.getStatus(country)} />
            </div>

            {expanded && (
              <>
                <div>{formatDate(country.lastEdit)}</div>
                <div>{formatDate(country.lastInReview)}</div>
                <div>{formatDate(country.lastInApproval)}</div>
                <div>{formatDate(country.lastInAccepted)}</div>
              </>
            )}
            {!expanded && <div>{formatDate(country.lastUpdate)}</div>}
          </>
        )}
      </div>
    </components.Option>
  )
}

export default Option
