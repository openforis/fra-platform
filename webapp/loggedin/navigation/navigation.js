import './navigation.less'

import React from 'react'

import { assessments } from '@common/assessmentSectionItems'

import Assessment from '@webapp/loggedin/navigation/components/assessment'
import LinkLanding from '@webapp/loggedin/navigation/components/linkLanding'
import LinkPanEuropeanIndicators from '@webapp/loggedin/navigation/components/linkPanEuropeanIndicators'
import Footer from '@webapp/loggedin/navigation/components/footer'

const Navigation = () => (
  <div className="nav no-print">

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
  </div>
)

export default Navigation
