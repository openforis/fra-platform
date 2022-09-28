import './CollaboratorPermissions.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { User } from '@meta/user'

import CollaboratorAccessModal from '@client/components/CollaboratorAccessModal'

type Props = {
  user: User
}

const CollaboratorPermissions = (props: Props) => {
  const { user } = props
  const { i18n } = useTranslation()

  const [modalOptions, setModalOptions] = useState<{ open: boolean }>({ open: false })

  const _onEditPermissionsClick = () => {
    setModalOptions({ open: true })
  }

  const _onEditPermissionsClose = () => {
    setModalOptions({ open: false })
  }

  return (
    <div className="edit-user__form-item">
      <div className="edit-user__form-label">{i18n.t<string>('Permissions')}</div>

      <div className="edit-user__form-field edit-user__form-field-premissions">
        <div>
          <button className="btn-xs btn-primary" onClick={_onEditPermissionsClick} type="button">
            {i18n.t<string>('userManagement.editPermissions')}
          </button>
        </div>
      </div>

      <CollaboratorAccessModal
        open={modalOptions.open}
        user={user}
        headerLabel={i18n.t<string>('userManagement.editPermissions')}
        onClose={_onEditPermissionsClose}
      />
    </div>
  )
}

export default CollaboratorPermissions
