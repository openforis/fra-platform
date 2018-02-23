import React from 'react'
import { connect } from 'react-redux'

import NotFound from '../app/notfound'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'

class EditUserView extends React.Component {

  componentWillMount () {

  }

  componentWillReceiveProps () {

  }

  render () {
    console.log('==== ', this.props)

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">yop</h1>
        </div>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  sessionUser: state.user.userInfo,
  countryIso: props.match.params.countryIso,
  userId: props.match.params.userId
})

export default connect(mapStateToProps)(EditUserView)
