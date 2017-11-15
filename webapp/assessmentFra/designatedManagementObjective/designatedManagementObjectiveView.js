import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import {
  primaryDesignatedManagementObjectiveTableSpec,
  totalAreaWithDesignatedManagementObjectiveTableSpec
} from './tableSpecs'
import { CommentableDescriptions } from '../../description/commentableDescription'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'

const sectionName = 'designatedManagementObjective'

class designatedManagementObjectiveView extends React.Component {

  componentWillMount() {
    this.props.fetchLastSectionUpdateTimestamp(
      this.props.match.params.countryIso,
      sectionName
    )
  }

  render() {
    const {match, i18n, extentOfForest} = this.props
    const countryIso = match.params.countryIso
    const primaryDmoTableSpec = primaryDesignatedManagementObjectiveTableSpec(i18n, extentOfForest, countryIso)
    const totalDmoTableSpec = totalAreaWithDesignatedManagementObjectiveTableSpec(i18n)

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">
            {i18n.t('designatedManagementObjective.designatedManagementObjective')}
          </h1>
          <DefinitionLink document="tad" anchor="3a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
          <DefinitionLink document="faq" anchor="3a" title={i18n.t('definition.faqLabel')} lang={i18n.language}
                          className="align-left"/>
        </div>
        <h3 className="subhead dmo__table-header">
          {i18n.t('designatedManagementObjective.primaryDesignatedManagementObjective')}
        </h3>
        <p className="dmo__support-text">{i18n.t('designatedManagementObjective.primaryDesignatedManagementObjectiveSupport')}</p>
        <TraditionalTable
          tableSpec={primaryDmoTableSpec}
          countryIso={countryIso}
          section={sectionName}/>
        <h3 className="subhead dmo__table-header">
          {i18n.t('designatedManagementObjective.totalAreaWithDesignatedManagementObjective')}
        </h3>
        <p className="dmo__support-text">{i18n.t('designatedManagementObjective.totalAreaWithDesignatedManagementObjectiveSupport')}</p>
        <TraditionalTable
          tableSpec={totalDmoTableSpec}
          countryIso={countryIso}
          section={sectionName}/>
        <CommentableDescriptions
          section={primaryDmoTableSpec.name}
          name={sectionName}
          countryIso={countryIso}
          i18n={i18n}
        />
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(designatedManagementObjectiveView)
