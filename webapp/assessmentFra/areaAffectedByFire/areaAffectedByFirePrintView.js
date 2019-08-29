import React from 'react'
import { connect } from 'react-redux'
import tableSpec, { tableProps } from './tableSpec'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import { isPrintingOnlyTables } from '../../printAssessment/printAssessment'

const AreaAffectedByFirePrintView = props => {

  const { i18n, match } = props
  const { countryIso } = match.params
  const tableSpecPrint1 = tableSpec(i18n, tableProps.areaAffectedByFirePrint1)
  const tableSpecPrint2 = tableSpec(i18n, tableProps.areaAffectedByFirePrint2)

  return <LoggedInPageTemplate>

    <h2 className="title only-print">
      5b {i18n.t('areaAffectedByFire.areaAffectedByFire')}
    </h2>

    <div className="fra-view__content">
      <NationalDataDescriptions section={tableProps.areaAffectedByFire.name} countryIso={countryIso}/>
      <AnalysisDescriptions section={tableProps.areaAffectedByFire.name} countryIso={countryIso}/>

      <h2 className="headline no-print">
        {i18n.t('areaAffectedByFire.areaAffectedByFire')}
      </h2>
      <div className="fra-view__section-toolbar">
      </div>

      <TraditionalTable tableSpec={tableSpecPrint1} countryIso={countryIso}/>
      {
        !isPrintingOnlyTables() &&
        <div className="page-break"/>
      }
      <TraditionalTable tableSpec={tableSpecPrint2} countryIso={countryIso}/>

      <GeneralComments section={tableProps.areaAffectedByFire.name} countryIso={countryIso}/>
    </div>
  </LoggedInPageTemplate>

}

const mapStateToProps = state => ({ i18n: state.user.i18n })

export default connect(mapStateToProps)(AreaAffectedByFirePrintView)
