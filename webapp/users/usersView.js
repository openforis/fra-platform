import React from 'react'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { connect } from 'react-redux'
import * as R from 'ramda'

class UsersView extends React.Component {
  render () {
    const {i18n} = this.props

    return <LoggedInPageTemplate>
      <div className="tv__container">
        <h1 className="title">{i18n.t('users.manageUsers')}</h1>

      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({
    i18n: state.user.i18n
  })

export default connect(mapStateToProps)(UsersView)
