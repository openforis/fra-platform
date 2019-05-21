import React from 'react'
import { connect } from 'react-redux'
import tableSpec, { tableProps } from './tableSpec'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'

const DisturbancesPrintView = props => {

  const {i18n, match, extentOfForest} = props
  const {countryIso} = match.params
  const tableSpecPrint1 = tableSpec(i18n, extentOfForest, countryIso, tableProps.disturbancesPrint1)
  const tableSpecPrint2 = tableSpec(i18n, extentOfForest, countryIso, tableProps.disturbancesPrint2)

  return <LoggedInPageTemplate>

    <h2 className="title only-print">
      5a {i18n.t('disturbances.disturbances')}
    </h2>

    <div className="fra-view__content">
      <NationalDataDescriptions section={tableProps.disturbances.name} countryIso={countryIso}/>
      <AnalysisDescriptions section={tableProps.disturbances.name} countryIso={countryIso}/>

      <h2 className="headline no-print">
        {i18n.t('disturbances.disturbances')}
      </h2>
      <div className="fra-view__section-toolbar">
      </div>

      <TraditionalTable tableSpec={tableSpecPrint1} countryIso={countryIso}/>
      <div className="page-break"/>
      <TraditionalTable tableSpec={tableSpecPrint2} countryIso={countryIso}/>
      <GeneralComments section={tableProps.disturbances.name} countryIso={countryIso}/>
    </div>
  </LoggedInPageTemplate>


}

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(DisturbancesPrintView)
