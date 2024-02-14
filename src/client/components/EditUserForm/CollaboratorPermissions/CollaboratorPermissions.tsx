import './CollaboratorPermissions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Collaborator, CollaboratorPermissions as CollabPermissions } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryIso } from 'client/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import CollaboratorPermissionsEditor from 'client/components/user/CollaboratorPermissionsEditor'

type Props = {
  userRole: Collaborator
}

const CollaboratorPermissions = (props: Props) => {
  const dispatch = useAppDispatch()
  const { userRole } = props
  const { t } = useTranslation()

  const { assessmentName, cycleName } = useCycleRouteParams()
  const countryIso = useCountryIso()

  const permissions = (userRole.permissions as CollabPermissions) || undefined

  const handlePermissionsChange = (permissions: CollabPermissions) => {
    dispatch(
      UserManagementActions.updateSectionAuth({
        id: userRole.id,
        sections: permissions?.sections,
        params: {
          assessmentName,
          cycleName,
          countryIso,
        },
      })
    )
  }

  return (
    <div className="edit-user__form-item edit-user__form-item-permissions">
      <div className="edit-user__form-label">{t(`userManagement.permissions`)}</div>

      <div className="edit-user__form-field edit-user__form-field-premissions">
        <CollaboratorPermissionsEditor permissions={permissions} onPermissionsChange={handlePermissionsChange} />
      </div>
    </div>
  )
}

export default CollaboratorPermissions
