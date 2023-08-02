import './Navigation.scss'
import React, { useEffect } from 'react'
import MediaQuery from 'react-responsive'

import { useAppDispatch } from 'client/store'
import { NavigationActions } from 'client/store/ui/navigation'
import { useCountryIso, useIsGeoPage } from 'client/hooks'
import { useIsPrint } from 'client/hooks/useIsPath'
import { Breakpoints } from 'client/utils'

import NavigationDesktop from './NavigationDesktop'
import NavigationMobile from './NavigationMobile'

const Navigation: React.FC = () => {
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const { print } = useIsPrint()
  const isInGeoPage = useIsGeoPage()

  useEffect(() => {
    if (print) dispatch(NavigationActions.updateNavigationVisible(false))
  }, [print, dispatch, isInGeoPage])

  if (isInGeoPage || !countryIso || print) return <div />

  return (
    <>
      <MediaQuery minWidth={Breakpoints.laptop}>
        <NavigationDesktop />
      </MediaQuery>
      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <NavigationMobile />
      </MediaQuery>
    </>
  )
}
export default Navigation
