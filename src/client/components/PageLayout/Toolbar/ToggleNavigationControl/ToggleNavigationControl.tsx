import React from 'react'

import { useAppDispatch } from 'client/store/hooks'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useNavigationVisible } from 'client/store/ui/countryReport/hooks/navigation'
import { useIsAdminRoute, useIsCycleLandingRoute, useIsGeoRoute } from 'client/hooks/routes'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { IconName } from 'client/components/Icon/types'

const ToggleNavigationControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const isCycleLanding = useIsCycleLandingRoute()
  const isAdmin = useIsAdminRoute()
  const isInGeoPage = useIsGeoRoute()
  const disabled = isCycleLanding || isAdmin || isInGeoPage
  const navigationVisible = useNavigationVisible()

  return (
    <Button
      bgTransparent
      disabled={disabled}
      iconName={IconName.menuLeft}
      inverse={navigationVisible}
      noBorder
      onClick={() => dispatch(CountryReportActions.setNavigationVisible())}
      size={ButtonSize.l}
      type={navigationVisible ? ButtonType.primary : ButtonType.transparent}
    />
  )
}

export default ToggleNavigationControl
