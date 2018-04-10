import React from 'react'
import { connect } from 'react-redux'

import tableSpec, { tableProps } from './tableSpec'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'

const EmploymentPrintView = props => {

  const {i18n, match} = props
  const {countryIso} = match.params
  const tableSpecPrint1 = tableSpec(i18n, tableProps.employmentPrint1)
  const tableSpecPrint2 = tableSpec(i18n, tableProps.employmentPrint2)

  return <LoggedInPageTemplate>
    <div className="fra-view__content">
      <NationalDataDescriptions section={tableProps.employment.name} countryIso={countryIso}/>

      <h2 className="headline">
        {i18n.t('employment.employment')} ({i18n.t('employment.average')})
      </h2>
      <div className="fra-view__section-toolbar">
      </div>

      <TraditionalTable tableSpec={tableSpecPrint1} countryIso={countryIso}/>
      <TraditionalTable tableSpec={tableSpecPrint2} countryIso={countryIso}/>

      <GeneralComments section={tableProps.employment.name} countryIso={countryIso}/>
    </div>
  </LoggedInPageTemplate>

}

const mapStateToProps = state => ({
  i18n: state.user.i18n
})

export default connect(mapStateToProps)(EmploymentPrintView)
