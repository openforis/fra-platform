import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../loggedInPageTemplate'

class DataFetchingComponent extends React.Component {
  componentWillMount () {
    // this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    // if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      // this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    // this.props.fetch(countryIso)
  }

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <div>hello</div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({...state.forestCharacteristics,
    'openCommentThread': state.review.openThread,
    i18n: state.user.i18n
  })

export default connect(mapStateToProps, {})(DataFetchingComponent)
