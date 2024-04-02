import './Navigation.scss'
import React, { useEffect } from 'react'
import MediaQuery from 'react-responsive'

import { useAppDispatch } from 'client/store'
import { useIsHistoryActive } from 'client/store/data'
import { NavigationActions } from 'client/store/ui/navigation'
import { useCountryIso } from 'client/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import NavigationHistory from 'client/components/Navigation/NavigationHistory'
import { Breakpoints } from 'client/utils'

import NavigationDesktop from './NavigationDesktop'
import NavigationMobile from './NavigationMobile'

const Navigation: React.FC = () => {
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const { print } = useIsPrintRoute()
  const historyActive = useIsHistoryActive()

  useEffect(() => {
    if (print) dispatch(NavigationActions.updateNavigationVisible(false))
  }, [print, dispatch])

  if (!countryIso || print) return <div />
  if (historyActive) return <NavigationHistory />

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
