import React, { memo } from 'react'
import { useParams } from 'react-router-dom'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isAdministrator } from '@common/countryRole'
import { useUserInfo } from '@webapp/components/hooks'

import NotFound from '@webapp/app/notfound'
import EditUserForm from '@webapp/app/user/userManagement/edit/editUserForm'

const canEdit = (userInfo: any, userId: any) => isAdministrator(userInfo) || userInfo.id === userId

const User = () => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'countryIso' does not exist on type '{}'.
  const { countryIso, userId } = useParams()
  const userInfo = useUserInfo()

  if (!canEdit(userInfo, userId)) return <NotFound />

  return (
    <div className="app-view__content">
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ userId: any; countryIso: any; }' is not as... Remove this comment to see the full error message */}
      <EditUserForm userId={userId} countryIso={countryIso} />
    </div>
  )
}

export default memo(User)
