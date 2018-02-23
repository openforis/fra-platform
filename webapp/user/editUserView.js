import React from 'react'
import { connect } from 'react-redux'

import NotFound from '../app/notfound'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import EditUserForm from './editUserComponents/editUserForm'

import { isAdministrator } from '../../common/countryRole'

class EditUserView extends React.Component {

  canEdit () {
    //only admin or him/her self can edit the user
    const {userInfo, userId} = this.props
    return isAdministrator(userInfo) || userInfo.id === userId
  }

  render () {
    const {userId} = this.props
    return this.canEdit()
      ? <LoggedInPageTemplate>
        <div className="fra-view__content">
          <EditUserForm userId={userId}/>
        </div>
      </LoggedInPageTemplate>
      : <NotFound/>
  }
}

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  countryIso: props.match.params.countryIso,
  userId: props.match.params.userId
})

export default connect(mapStateToProps)(EditUserView)
