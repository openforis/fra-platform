import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import NotFound from '@webapp/app/notfound'

import { isAdministrator } from '@common/countryRole'

import { UserState } from '@webapp/store/user'
import EditUserForm from './edit/editUserForm'

function canEdit(userInfo: any, userId: any) {
  return isAdministrator(userInfo) || userInfo.id === userId
}

const EditUserView = ({ userInfo }: any) => {
  const { userId }: any = useParams()

  return canEdit(userInfo, userId) ? (
    <div className="app-view__content">
      <EditUserForm userId={userId} />
    </div>
  ) : (
    <NotFound />
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: UserState.getUserInfo(state),
})

export default connect(mapStateToProps)(EditUserView)
