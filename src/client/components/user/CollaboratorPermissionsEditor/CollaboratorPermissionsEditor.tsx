import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CollaboratorPermissions } from 'meta/user'

import { useSections } from 'client/store/metadata'
import ModalEditor from 'client/components/user/CollaboratorPermissionsEditor/ModalEditor'

type Props = {
  permissions: CollaboratorPermissions | undefined
  onPermissionsChange: (permissions: CollaboratorPermissions) => void
}

const CollaboratorPermissionsEditor: React.FC<Props> = (props) => {
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
    <>
      <button className="btn-xs btn-primary" onClick={_onEditPermissionsClick} type="button">
        {t('userManagement.editPermissions')}
      </button>

      <ModalEditor
        open={modalOptions.open}
        permissions={permissions}
        onClose={_onEditPermissionsClose}
        onPermissionsChange={onPermissionsChange}
      />
    </>
  )
}

export default CollaboratorPermissionsEditor
