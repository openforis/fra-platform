import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import { primaryDesignatedManagementObjectiveTableSpec, totalAreaWithDesignatedManagementObjectiveTableSpec } from './tableSpecs'
import { CommentableDescriptions } from '../description/commentableDescription'
import DefinitionLink from './../reusableUiComponents/definitionLink'

const designatedManagementObjectiveView = ({match, i18n}) => {
  const primaryDmoTableSpec = primaryDesignatedManagementObjectiveTableSpec(i18n)
  const totalDmoTableSpec = totalAreaWithDesignatedManagementObjectiveTableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container">
      <div className="tv__page-header">
        <h1 className="title tv__page-header">{i18n.t('designatedManagementObjective.designatedManagementObjective')}</h1>
        <DefinitionLink document="tad" anchor="5a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink document="faq" anchor="5a" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      </div>
      <h3 className="subhead dmo__table-header">{i18n.t('designatedManagementObjective.primaryDesignatedManagementObjective')}</h3>
      <TraditionalTable
        tableSpec={primaryDmoTableSpec}
        countryIso={match.params.countryIso}
        section="designatedManagementObjective"
        reviewTargetPrefix="primaryDesignatedManagementObjective"/>
      <h3 className="subhead dmo__table-header" style={{marginTop: '24px'}}>{i18n.t('designatedManagementObjective.totalAreaDesignatedManagementObjective')}</h3>
      <TraditionalTable
        tableSpec={totalDmoTableSpec}
        countryIso={match.params.countryIso}
        section="designatedManagementObjective"
        reviewTargetPrefix="totalAreaDesignatedManagementObjective"/>
      <CommentableDescriptions
        section={primaryDmoTableSpec.name}
        name="designatedManagementObjective"
        countryIso={match.params.countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(designatedManagementObjectiveView)
