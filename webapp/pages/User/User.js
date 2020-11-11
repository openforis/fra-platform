import React from 'react'
import { useParams } from 'react-router-dom'

import NotFound from '@webapp/app/notfound'

import { isAdministrator } from '@common/countryRole'

import useUserInfo from '@webapp/components/hooks/useUserInfo'
import EditUserForm from '@webapp/app/user/userManagement/edit/editUserForm'

function canEdit(userInfo, userId) {
  return isAdministrator(userInfo) || userInfo.id === userId
}

const EditUserView = () => {
  const { countryIso, userId } = useParams()
  const userInfo = useUserInfo()

  return canEdit(userInfo, userId) ? (
    <div className="app-view__content">
      <EditUserForm userId={userId} countryIso={countryIso} />
    </div>
  ) : (
    <NotFound />
  )
}

export default EditUserView
