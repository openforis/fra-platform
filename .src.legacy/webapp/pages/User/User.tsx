import React, { memo } from 'react'
import { useParams } from 'react-router-dom'

import { isAdministrator } from '@common/countryRole'

import NotFound from '@webapp/app/notfound'
import EditUserForm from '@webapp/app/user/userManagement/edit/editUserForm'
import { useUserInfo } from '@webapp/store/user'

const canEdit = (userInfo: any, userId: any) => isAdministrator(userInfo) || userInfo.id === userId

const User = () => {
  const { userId }: any = useParams()
  const userInfo = useUserInfo()

  if (!canEdit(userInfo, userId)) return <NotFound />

  return (
    <div className="app-view__content">
      <EditUserForm userId={userId} />
    </div>
  )
}

export default memo(User)
