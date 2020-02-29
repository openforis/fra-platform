import './navigation.less'

import React from 'react'

import { assessments } from '@common/assessmentSectionItems'

import Assessment from '@webapp/loggedin/navigation/components/assessment'
import LinkLanding from '@webapp/loggedin/navigation/components/linkLanding'
import LinkPanEuropeanIndicators from '@webapp/loggedin/navigation/components/linkPanEuropeanIndicators'
import Footer from '@webapp/loggedin/navigation/components/footer'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const Navigation = () => {
  const countryIso = useCountryIso()

  return (
    <div className="nav no-print">
      {
        countryIso &&
        <>
          <LinkLanding/>
          <div className="nav__divider"/>

          {
            Object.keys(assessments).map(
              (name, i) =>
                <Assessment
                  key={i}
                  name={name}
                />
            )
          }

          <LinkPanEuropeanIndicators/>

          <div className="nav__divider"/>

          <Footer/>
        </>
      }
    </div>
  )
}

export default Navigation
