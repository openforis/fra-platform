import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'

const mapStateToProps = state => state

class SpecificForestCategoriesView extends React.Component {
  render() {
    return <LoggedInPageTemplate>
      <div className="sfc__container">
        <h2 className="headline">Specific forest categories</h2>
      </div>
    </LoggedInPageTemplate>
  }
}

export default connect(mapStateToProps, {})(SpecificForestCategoriesView)
