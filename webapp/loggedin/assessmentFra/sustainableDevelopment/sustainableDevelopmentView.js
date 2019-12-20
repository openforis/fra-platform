import './sustainableDevelopmentView.less'

import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import DefinitionLink from '@webapp/components/definitionLink'
import defaultYears from '../../../../server/eof/defaultYears'

import Indicator from './indicators/indicator'
import SubIndicator1 from './indicators/subIndicator1'
import SubIndicator2 from './indicators/subIndicator2'
import SubIndicator3 from './indicators/subIndicator3'
import SubIndicator4 from './indicators/subIndicator4'
import SubIndicator5 from './indicators/subIndicator5'

import { fetchLastSectionUpdateTimestamp } from '@webapp/audit/actions'
import { fetch } from './actions'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import { isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import * as AppState from '@webapp/app/appState'

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
      <div className="fra-view__content fra-sustainable-dev__content">

        <h2 className="title only-print">
          {`${isPrintingOnlyTables() ? '' : '8a '}${i18n.t('sustainableDevelopment.sustainableDevelopment')}`}
        </h2>

        <h2 className="headline no-print">
          {i18n.t('sustainableDevelopment.sustainableDevelopment')}
        </h2>

        <div className="fra-view__section-toolbar">
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
  i18n: state.user.i18n,
  data: state.sustainableDevelopment,
  countryConfig: R.path(['country', 'config'], state),
  isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp, fetch })(SustainableDevelopmentView)
