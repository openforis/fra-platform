import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import NotFound from '@webapp/app/notfound'
import EditUserForm from './edit/editUserForm'

import { isAdministrator } from '@common/countryRole'

import * as UserState from '@webapp/user/userState'

function canEdit(userInfo, userId) {
  return isAdministrator(userInfo) || userInfo.id === userId
}

const EditUserView = ({ userInfo }) => {
  const { countryIso, userId } = useParams()

  return canEdit(userInfo, userId) ?
    <div className="fra-view__content">
      <EditUserForm userId={userId} countryIso={countryIso} />
    </div>
    : <NotFound />
}
const mapStateToProps = (state) => ({
  userInfo: UserState.getUserInfo(state),
})

export default connect(mapStateToProps)(EditUserView)
