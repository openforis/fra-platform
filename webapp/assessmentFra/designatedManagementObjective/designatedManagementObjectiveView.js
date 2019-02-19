import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import {
  primaryDesignatedManagementObjectiveTableSpec,
  totalAreaWithDesignatedManagementObjectiveTableSpec
} from './tableSpecs'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'

import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'

const sectionName = 'designatedManagementObjective'

class designatedManagementObjectiveView extends React.Component {

  componentWillMount () {
    this.props.fetchLastSectionUpdateTimestamp(
      this.props.match.params.countryIso,
      sectionName
    )
  }

  render () {
    const {match, i18n, extentOfForest, isEditDataDisabled} = this.props
    const countryIso = match.params.countryIso
    const primaryDmoTableSpec = primaryDesignatedManagementObjectiveTableSpec(i18n, extentOfForest, countryIso)
    const totalDmoTableSpec = totalAreaWithDesignatedManagementObjectiveTableSpec(i18n)

    return <LoggedInPageTemplate>

      <h2 className="title only-print">
        3a {i18n.t('designatedManagementObjective.designatedManagementObjective')}
      </h2>

      <div className="fra-view__content">
        <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
        <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
        <h2 className="headline no-print">
          {i18n.t('designatedManagementObjective.designatedManagementObjective')}
        </h2>
        <div className="fra-view__section-toolbar">
          <DefinitionLink className="margin-right-big" document="tad" anchor="3a"
                          title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
          <DefinitionLink className="align-left" document="faq" anchor="3a" title={i18n.t('definition.faqLabel')}
                          lang={i18n.language}/>
        </div>
        <h3 className="subhead">
          {i18n.t('designatedManagementObjective.primaryDesignatedManagementObjective')}
        </h3>
        <div className="fra-view__section-toolbar">
          <div className="support-text no-print">
            {i18n.t('designatedManagementObjective.primaryDesignatedManagementObjectiveSupport')}
          </div>
        </div>
        <TraditionalTable
          tableSpec={primaryDmoTableSpec}
          countryIso={countryIso}
          section={sectionName}
          disabled={isEditDataDisabled}/>
        <h3 className="subhead">
          {i18n.t('designatedManagementObjective.totalAreaWithDesignatedManagementObjective')}
        </h3>
        <div className="fra-view__section-toolbar">
          <div className="support-text no-print">
            {i18n.t('designatedManagementObjective.totalAreaWithDesignatedManagementObjectiveSupport')}
          </div>
        </div>
        <TraditionalTable
          tableSpec={totalDmoTableSpec}
          countryIso={countryIso}
          section={sectionName}
          disabled={isEditDataDisabled}/>
        <GeneralComments
          section={sectionName}
          countryIso={countryIso}
          disabled={isEditDataDisabled}
        />
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest,
  isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(designatedManagementObjectiveView)
