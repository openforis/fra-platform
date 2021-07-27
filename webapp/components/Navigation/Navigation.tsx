import './navigation.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import { useCountryIso } from '@webapp/components/hooks'
import { Breakpoints } from '@webapp/utils/breakpoints'

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
