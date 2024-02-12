import './CollaboratorPermissions.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Collaborator, CollaboratorPermissions as CollabPermissions } from 'meta/user'

import { useSections } from 'client/store/metadata'
import CollaboratorAccessList from 'client/components/CollaboratorAccessList'
import CollaboratorAccessModal from 'client/components/CollaboratorAccessModal'

type Props = {
  userRole: Collaborator
}

const CollaboratorPermissions = (props: Props) => {
  const { userRole } = props
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

  const permissions = (userRole.permissions as CollabPermissions) || undefined

  return (
    <div className="edit-user__form-item edit-user__form-item-permissions">
      <div className="edit-user__form-label">{t(`userManagement.permissions`)}</div>

      <div className="edit-user__form-field edit-user__form-field-premissions">
        <CollaboratorAccessList permissions={permissions} />

        <button className="btn-xs btn-primary" onClick={_onEditPermissionsClick} type="button">
          {t('userManagement.editPermissions')}
        </button>
      </div>

      <CollaboratorAccessModal open={modalOptions.open} userRole={userRole} onClose={_onEditPermissionsClose} />
    </div>
  )
}

export default CollaboratorPermissions
