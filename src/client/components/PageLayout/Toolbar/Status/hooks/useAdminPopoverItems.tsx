import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Users } from 'meta/user'

import { AreaActions } from 'client/store/area/actions'
import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useAppDispatch } from 'client/store/hooks'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { PopoverItem } from 'client/components/PopoverControl'

export const useAdminPopoverItems = (): Array<PopoverItem> => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useUser()
  const country = useAssessmentCountry()

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useMemo<Array<PopoverItem>>(() => {
    if (Objects.isNil(country) || !Users.isAdministrator(user)) return []

    const toggleDeskStudy = (): void => {
      const countryUpdate: Country = { ...country, props: { ...country.props, deskStudy: !country.props.deskStudy } }
      dispatch(AreaActions.updateCountry({ country: countryUpdate, countryIso, cycleName, assessmentName }))
    }

    const { deskStudy } = country.props ?? {}

    const contentDeskStudy = (
      <div className="popover-control__checkbox-container">
        <span className={classNames('fra-checkbox', { checked: deskStudy })} style={{ marginRight: '8px' }} />
        <span>{t<string>('assessment.deskStudy')}</span>
      </div>
    )
    return [{ divider: true }, { content: contentDeskStudy, onClick: toggleDeskStudy }]
  }, [assessmentName, country, countryIso, cycleName, dispatch, t, user])
}
