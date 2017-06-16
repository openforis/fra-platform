import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'

const mapStateToProps = state => state

class SpecificForestCategoriesView extends React.Component {
  render() {
    return <LoggedInPageTemplate>
      <h2 className="headline">Specific forest categories</h2>
    </LoggedInPageTemplate>
  }
}

export default connect(mapStateToProps, {})(SpecificForestCategoriesView)
