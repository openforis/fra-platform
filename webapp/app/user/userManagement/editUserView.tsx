import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import NotFound from '@webapp/app/notfound'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isAdministrator } from '@common/countryRole'

import { UserState } from '@webapp/store/user'
import EditUserForm from './edit/editUserForm'

function canEdit(userInfo: any, userId: any) {
  return isAdministrator(userInfo) || userInfo.id === userId
}

const EditUserView = ({ userInfo }: any) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'countryIso' does not exist on type '{}'.
  const { countryIso, userId } = useParams()

  return canEdit(userInfo, userId) ? (
    <div className="app-view__content">
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ userId: any; countryIso: any; }' is not as... Remove this comment to see the full error message */}
      <EditUserForm userId={userId} countryIso={countryIso} />
    </div>
  ) : (
    <NotFound />
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: UserState.getUserInfo(state),
})

export default connect(mapStateToProps)(EditUserView)
