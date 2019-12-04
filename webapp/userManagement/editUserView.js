import React from 'react'
import { connect } from 'react-redux'

import NotFound from '../app/notfound'
import EditUserForm from './edit/editUserForm'

import { isAdministrator } from '../../common/countryRole'

class EditUserView extends React.Component {

  render () {
    const {userInfo, userId, countryIso} = this.props

    //only admin or him/her self can edit the user
    const canEdit = isAdministrator(userInfo) || userInfo.id === userId

    return canEdit
      ? <div className="fra-view__content">
          <EditUserForm userId={userId} countryIso={countryIso} />
        </div>
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
