import './navigation.less'

import React from 'react'

import * as FRA from '@common/assessment/fra'

import Assessment from '@webapp/app/components/navigation/components/assessment'
import LinkLanding from '@webapp/app/components/navigation/components/linkLanding'
import LinkPanEuropeanIndicators from '@webapp/app/components/navigation/components/linkPanEuropeanIndicators'
import Footer from '@webapp/app/components/navigation/components/footer'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const Navigation = () => {
  const countryIso = useCountryIso()
  return (
    <div className="nav no-print">
      {countryIso && (
        <>
          <LinkLanding />
          <div className="nav__divider" />
          <Assessment name={FRA.type} sections={FRA.sections} />
          <LinkPanEuropeanIndicators />
          <div className="nav__divider" />
          <Footer />
        </>
      )}
    </div>
  )
}
export default Navigation
