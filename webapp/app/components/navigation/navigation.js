import './navigation.less'

import React from 'react'

import * as FRA from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'

import Assessment from '@webapp/app/components/navigation/components/assessment'
import LinkLanding from '@webapp/app/components/navigation/components/linkLanding'
import LinkPanEuropeanIndicators from '@webapp/app/components/navigation/components/linkPanEuropeanIndicators'
import Footer from '@webapp/app/components/navigation/components/footer'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import { useIsDataExportView } from '@webapp/components/hooks'
import * as Country from '@common/country/country'
import { useSelector } from 'react-redux'
import * as CountryState from '@webapp/app/country/countryState'

const Navigation = () => {
  const countryIso = useCountryIso()
  const isDataExport = useIsDataExportView()
  const country = useSelector(CountryState.getCountryByCountryIso(countryIso))

  return (
    <div className="nav no-print">
      {(countryIso || isDataExport) && (
        <>
          {!isDataExport && (
            <>
              <LinkLanding />
              <div className="nav__divider" />
            </>
          )}
          <Assessment assessment={FRA} />
          {!isDataExport && <LinkPanEuropeanIndicators />}
          <div className="nav__divider" />
          {country && Country.isPanEuropean(country) && (
            <>
              <Assessment assessment={PanEuropean} />
              <div className="nav__divider" />
            </>
          )}
          <Footer />
        </>
      )}
    </div>
  )
}
export default Navigation
