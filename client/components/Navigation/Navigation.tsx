import './Navigation.scss'
import React, { useEffect } from 'react'
import MediaQuery from 'react-responsive'

import { useCountryIso } from '@client/hooks'
import { Breakpoints } from '@client/utils'
import { AssessmentActions } from '@client/store/assessment'
import { useAppDispatch } from '@client/store'

import NavigationDesktop from './NavigationDesktop'
import NavigationMobile from './NavigationMobile'

const Navigation: React.FC = () => {
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()

  // TODO: get these from settings
  const name = 'fra'
  const cycleName = '2025'
  useEffect(() => {
    dispatch(AssessmentActions.getSections({ name, cycleName }))
  }, [])

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
