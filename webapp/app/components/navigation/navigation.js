import './navigation.less'

import React from 'react'

import { assessments } from '@common/assessmentSectionItems'

import Assessment from '@webapp/app/components/navigation/components/assessment'
import LinkLanding from '@webapp/app/components/navigation/components/linkLanding'
import LinkPanEuropeanIndicators from '@webapp/app/components/navigation/components/linkPanEuropeanIndicators'
import Footer from '@webapp/app/components/navigation/components/footer'
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
