import React from 'react'
import { useParams } from 'react-router-dom'

import NotFound from '@webapp/app/notfound'

import { isAdministrator } from '@common/countryRole'

import { useUserInfo } from '@webapp/store/user'
import EditUserForm from './edit/editUserForm'

function canEdit(userInfo: any, userId: any) {
  return isAdministrator(userInfo) || userInfo.id === userId
}

const EditUserView = () => {
  const userInfo = useUserInfo()
  const { userId }: any = useParams()

  return canEdit(userInfo, userId) ? (
    <div className="app-view__content">
      <EditUserForm userId={userId} />
    </div>
  ) : (
    <NotFound />
  )
}

export default EditUserView
