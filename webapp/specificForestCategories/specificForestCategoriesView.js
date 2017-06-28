import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'

class SpecificForestCategoriesView extends React.Component {
  render() {
    return <LoggedInPageTemplate>
      <div className="sfc__container">
        <h2 className="headline sfc__page-header">Specific forest categories</h2>
        <TraditionalTable tableSpec={tableSpec} countryIso={this.props.match.params.countryIso}/>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(SpecificForestCategoriesView)
