import React from 'react'
import { connect } from 'react-redux'

import NotFound from '../app/notfound'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'

import { isAdministrator } from '../../common/countryRole'

class EditUserView extends React.Component {

  render () {
    const {userInfo,  countryIso} = this.props

    return isAdministrator(userInfo)
      ? <LoggedInPageTemplate>
        <div className="fra-view__content">

        </div>
      </LoggedInPageTemplate>
      : <NotFound/>
  }
}

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  countryIso: props.match.params.countryIso,
})

export default connect(mapStateToProps)(EditUserView)
