import './InviteCollaboratorPermissions.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CollaboratorPermissions } from 'meta/user'

import { useSections } from 'client/store/metadata'
import CollaboratorAccessList from 'client/components/CollaboratorAccessList'
import CollaboratorAccessModal from 'client/components/CollaboratorAccessModal'

type Props = {
  permissions: CollaboratorPermissions | undefined
  onPermissionsChange: (permissions: CollaboratorPermissions) => void
}

const InviteCollaboratorPermissions: React.FC<Props> = (props) => {
  const { onPermissionsChange, permissions } = props
  const { t } = useTranslation()
  const sections = useSections()

  const [modalOptions, setModalOptions] = useState<{ open: boolean }>({ open: false })

  const _onEditPermissionsClick = () => {
    setModalOptions({ open: true })
  }

  const _onEditPermissionsClose = () => {
    setModalOptions({ open: false })
  }

  if (!sections) return null

  return (
    <div className="edit-user__form-item invite-user__form-item-permissions">
      <div className="edit-user__form-label">{t(`userManagement.permissions`)}</div>

      <div className="edit-user__form-field invite-user__form-field-premissions">
        <CollaboratorAccessList permissions={permissions} />

        <button className="btn-xs btn-primary" onClick={_onEditPermissionsClick} type="button">
          {t('userManagement.editPermissions')}
        </button>
      </div>

      <CollaboratorAccessModal
        open={modalOptions.open}
        permissions={permissions}
        onClose={_onEditPermissionsClose}
        onPermissionsChange={onPermissionsChange}
      />
    </div>
  )
}

export default InviteCollaboratorPermissions
