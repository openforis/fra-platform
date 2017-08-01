import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import CommentableDescription from '../description/commentableDescription'

const PrimaryDesignatedManagementObjectiveView = ({match, i18n}) => {
  const tableProps = tableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container">
      <h2 className="headline tv__page-header">
        {i18n.t('primaryDesignatedManagementObjective.primaryDesignatedManagementObjective')}
      </h2>
      <TraditionalTable tableSpec={tableProps} countryIso={match.params.countryIso}/>
      <CommentableDescription
        section={tableProps.name}
        descriptionName="primaryDesignatedManagementObjective"
        descriptionTitle={i18n.t('description.description')}
        countryIso={match.params.countryIso}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(PrimaryDesignatedManagementObjectiveView)
