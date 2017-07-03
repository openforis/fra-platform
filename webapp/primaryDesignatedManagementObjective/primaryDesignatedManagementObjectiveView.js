import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'

class PrimaryDesignatedManagementObjectiveView extends React.Component {
  render() {
    return <LoggedInPageTemplate>
      <div className="pdmo__container">
        <h2 className="headline pdmo__page-header">Primary designated management objective</h2>
        <TraditionalTable tableSpec={tableSpec} countryIso={this.props.match.params.countryIso}/>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(PrimaryDesignatedManagementObjectiveView)
