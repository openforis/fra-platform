import './Navigation.scss'
import React, { useEffect } from 'react'
import MediaQuery from 'react-responsive'

import { useCountryIso } from '@client/hooks'
import { Breakpoints } from '@client/utils'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'
import { useAppDispatch } from '@client/store'

import NavigationDesktop from './NavigationDesktop'
import NavigationMobile from './NavigationMobile'

const Navigation: React.FC = () => {
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const assessment = useAssessment()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(AssessmentActions.getSections({ countryIso, name: assessment.props.name, cycleName: cycle.name }))
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
