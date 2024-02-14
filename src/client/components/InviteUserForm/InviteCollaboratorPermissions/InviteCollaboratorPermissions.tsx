import './InviteCollaboratorPermissions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CollaboratorPermissions } from 'meta/user'

import CollaboratorPermissionsEditor from 'client/components/user/CollaboratorPermissionsEditor'

type Props = {
  permissions: CollaboratorPermissions | undefined
  onPermissionsChange: (permissions: CollaboratorPermissions) => void
}

const InviteCollaboratorPermissions: React.FC<Props> = (props) => {
  const { onPermissionsChange, permissions } = props
  const { t } = useTranslation()

  return (
    <div className="edit-user__form-item invite-user__form-item-permissions">
      <div className="edit-user__form-label">{t(`userManagement.permissions`)}</div>
      <div className="edit-user__form-field invite-user__form-field-premissions">
        <CollaboratorPermissionsEditor permissions={permissions} onPermissionsChange={onPermissionsChange} />
      </div>
    </div>
  )
}

export default InviteCollaboratorPermissions
