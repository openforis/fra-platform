import React from 'react'
import { connect } from 'react-redux'
import tableSpec, { tableProps } from './tableSpec'

import TraditionalTable from '@webapp/traditionalTable/traditionalTable'
import NationalDataDescriptions from '@webapp/descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/descriptionBundles/analysisDescriptions'
import GeneralComments from '@webapp/descriptionBundles/generalComments'
import * as UserState from '@webapp/user/userState'

const DisturbancesPrintView = props => {

  const {i18n, match, extentOfForest} = props
  const {countryIso} = match.params
  const tableSpecPrint1 = tableSpec(i18n, extentOfForest, countryIso, tableProps.disturbancesPrint1)
  const tableSpecPrint2 = tableSpec(i18n, extentOfForest, countryIso, tableProps.disturbancesPrint2)

  return <>

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
  </>


}

const mapStateToProps = state => ({i18n: UserState.getI18n(state), extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(DisturbancesPrintView)
