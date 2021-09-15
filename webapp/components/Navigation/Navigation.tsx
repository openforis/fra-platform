import './Navigation.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import { Assessment, FRA, PanEuropean } from '@core/assessment'

import { useCountryIso } from '@webapp/hooks'
import { Breakpoints } from '@webapp/utils/breakpoints'
import { useAssessmentType } from '@webapp/store/app'

import NavigationDesktop from './NavigationDesktop'
import NavigationMobile from './NavigationMobile'

const Navigation: React.FC = () => {
  const countryIso = useCountryIso()

  const assessmentType = useAssessmentType()
  const assessment: Assessment = [FRA, PanEuropean].find(({ type }) => type === assessmentType)

  // admin view - navigation is not rendered
  if (!countryIso) return null

  return (
    <>
      <MediaQuery minWidth={Breakpoints.laptop}>
        <NavigationDesktop assessment={assessment} />
      </MediaQuery>
      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <NavigationMobile assessment={assessment} />
      </MediaQuery>
    </>
  )
}
export default Navigation
