import './navigation.less'

import React from 'react'
// import { useSelector } from 'react-redux'

import * as FRA from '@common/assessment/fra'
// import * as PanEuropean from '@common/assessment/panEuropean'
// import * as Country from '@common/country/country'

// import { useCountryIso } from '@webapp/components/hooks'
// import * as CountryState from '@webapp/app/country/countryState'

import Assessment from './components/assessment'
import LinkPanEuropeanIndicators from './components/linkPanEuropeanIndicators'

const Navigation = () => {
  // const countryIso = useCountryIso()
  // const country = useSelector(CountryState.getCountryByCountryIso(countryIso))
  // const showPanEuropean = country && Country.isPanEuropean(country)

  return (
    <div className="nav no-print">
      <Assessment assessment={FRA} />

      <LinkPanEuropeanIndicators />
      <div className="nav__divider" />

      {/* {showPanEuropean && ( */}
      {/*   <> */}
      {/*     <Assessment assessment={PanEuropean} /> */}
      {/*     <div className="nav__divider" /> */}
      {/*   </> */}
      {/* )} */}
    </div>
  )
}
export default Navigation
