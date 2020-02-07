import React from 'react'
import { connect } from 'react-redux'
import tableSpec, { tableProps } from './tableSpec'

import TraditionalTable from '@webapp/traditionalTable/traditionalTable'
import NationalDataDescriptions from '@webapp/descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/descriptionBundles/analysisDescriptions'
import GeneralComments from '@webapp/descriptionBundles/generalComments'
import { isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import * as UserState from '@webapp/user/userState'

const AreaAffectedByFirePrintView = props => {

  const { i18n, match } = props
  const { countryIso } = match.params
  const tableSpecPrint1 = tableSpec(i18n, tableProps.areaAffectedByFirePrint1)
  const tableSpecPrint2 = tableSpec(i18n, tableProps.areaAffectedByFirePrint2)

  return <>

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
  </>

}

 
const mapStateToProps = state => ({  i18n: UserState.getI18n(state) })

export default connect(mapStateToProps)(AreaAffectedByFirePrintView)
