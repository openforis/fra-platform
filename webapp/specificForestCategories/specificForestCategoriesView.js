import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import GenericTable from '../fraTable/genericTable'
import tableSpec from './tableSpec'

class SpecificForestCategoriesView extends React.Component {
  render() {
    return <LoggedInPageTemplate>
      <div className="sfc__container">
        <h2 className="headline ofc__page-header">Specific forest categories</h2>
        <GenericTable tableSpec={tableSpec} countryIso={this.props.match.params.countryIso}/>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(SpecificForestCategoriesView)
