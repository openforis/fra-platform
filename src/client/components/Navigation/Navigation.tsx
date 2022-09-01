import './Navigation.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import { useCountryIso } from '@client/hooks'
import { Breakpoints } from '@client/utils'

import NavigationDesktop from './NavigationDesktop'
import NavigationMobile from './NavigationMobile'

const Navigation: React.FC = () => {
  const countryIso = useCountryIso()

  // admin view - navigation is not rendered
  if (!countryIso) return null

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
