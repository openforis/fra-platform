import './navigation.less'

import React from 'react'
// import { useSelector } from 'react-redux'

import * as FRA from '@common/assessment/fra'
// import * as PanEuropean from '@common/assessment/panEuropean'
// import * as Country from '@common/country/country'

import { useCountryIso, useI18n } from '@webapp/components/hooks'
// import * as CountryState from '@webapp/app/country/countryState'

import Icon from '@webapp/components/icon'
import { isISOGlobal } from '@common/country/area'
import Assessment from './components/assessment'
import LinkPanEuropeanIndicators from './components/linkPanEuropeanIndicators'

const Navigation = () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  // const country = useSelector(CountryState.getCountryByCountryIso(countryIso))
  // const showPanEuropean = country && Country.isPanEuropean(country)

  // admin view - navigation is not rendered
  if (!countryIso) return null

  return (
    <div className="nav no-print">
      <Assessment assessment={FRA} />

      <LinkPanEuropeanIndicators />

      {isISOGlobal(countryIso) && (
        <a className="btn btn-primary nav__bulk-download" href="/api/dataExport/bulk" target="_blank" alt="">
          <Icon className="icon-sub icon-white" name="hit-down" />
          {i18n.t('navigation.bulkDownload')}
        </a>
      )}

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
