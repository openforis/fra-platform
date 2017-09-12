import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'

class GrowingStockView extends Component{
  render(){
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <div>GS</div>
    </LoggedInPageTemplate>
  }
}

export default GrowingStockView
