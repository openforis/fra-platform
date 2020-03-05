import './sustainableDevelopmentView.less'

import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import DefinitionLink from '@webapp/components/definitionLink'
import defaultYears from '../../../../../../server/eof/defaultYears'

import Indicator from '@webapp/app/assessment/fra/sections/sustainableDevelopment/indicators/indicator'
import SubIndicator1 from '@webapp/app/assessment/fra/sections/sustainableDevelopment/indicators/subIndicator1'
import SubIndicator2 from '@webapp/app/assessment/fra/sections/sustainableDevelopment/indicators/subIndicator2'
import SubIndicator3 from '@webapp/app/assessment/fra/sections/sustainableDevelopment/indicators/subIndicator3'
import SubIndicator4 from '@webapp/app/assessment/fra/sections/sustainableDevelopment/indicators/subIndicator4'
import SubIndicator5 from '@webapp/app/assessment/fra/sections/sustainableDevelopment/indicators/subIndicator5'

import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import { fetch } from './actions'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/app/country/countryState'
import { isSectionEditDisabled } from '@webapp/app/assessment/fra/fraState'

const sectionName = 'sustainableDevelopment'

const SustainableDevelopmentView = props => {
  const { i18n, data, countryConfig, isEditDataDisabled } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const lang = i18n.language
  const years = R.drop(1, defaultYears)

  useEffect(() => {
    props.fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }, [])

  useEffect(() => {
    props.fetch(countryIso)
  }, [countryIso])

  return !R.isEmpty(data) &&
    <>
      <div className="app-view__content fra-sustainable-dev__content">

        <h2 className="title only-print">
          {`${isPrintingOnlyTables() ? '' : '8a '}${i18n.t('sustainableDevelopment.sustainableDevelopment')}`}
        </h2>

        <h2 className="headline no-print">
          {i18n.t('sustainableDevelopment.sustainableDevelopment')}
        </h2>

        <div className="app-view__section-toolbar">
          <DefinitionLink className="margin-right-big" document="tad" anchor="8"
                          title={i18n.t('definition.definitionLabel')} lang={lang}/>
          <DefinitionLink className="align-left" document="faq" anchor="8" title={i18n.t('definition.faqLabel')}
                          lang={lang}/>
        </div>

        <h3 className="subhead" style={{ marginBottom: 16 }}>{i18n.t('sustainableDevelopment.sdgIndicator1')}</h3>

        <Indicator i18n={i18n}
                   countryIso={countryIso}
                   data={data}
                   years={years}
                   countryConfig={countryConfig}
                   disabled={isEditDataDisabled}/>

        <h3 className="subhead" style={{ marginBottom: 16 }}>{i18n.t('sustainableDevelopment.sdgIndicator2')}</h3>

        <SubIndicator1 i18n={i18n}
                       countryIso={countryIso}
                       data={data}
                       years={years}
                       disabled={isEditDataDisabled}/>

        <div className="page-break"/>
        <SubIndicator2 i18n={i18n}
                       countryIso={countryIso}
                       data={data}
                       years={years}
                       disabled={isEditDataDisabled}/>
        <SubIndicator3 i18n={i18n}
                       countryIso={countryIso}
                       data={data}
                       years={years}
                       disabled={isEditDataDisabled}/>

        <div className="page-break"/>
        <SubIndicator4 i18n={i18n}
                       countryIso={countryIso}
                       data={data}
                       years={years}
                       disabled={isEditDataDisabled}/>
        <SubIndicator5 i18n={i18n}
                       countryIso={countryIso}
                       data={data}
                       years={years}
                       countryConfig={countryConfig}
                       disabled={isEditDataDisabled}/>
      </div>
    </>
}

const mapStateToProps = state => ({
  i18n: AppState.getI18n(state),
  data: state.sustainableDevelopment,
  countryConfig: CountryState.getConfig(state),
  isEditDataDisabled: isSectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp, fetch })(SustainableDevelopmentView)
