import React from 'react'

import { CollaboratorPermissions } from 'meta/user'

import InviteCollaboratorPermissions from 'client/components/InviteUserForm/InviteCollaboratorPermissions'

import { FieldProps } from '../types'

const PermissionsField: React.FC<FieldProps> = (props) => {
  const { fieldDefinition, setValue, watch } = props

  const { name } = fieldDefinition

  return (
    <InviteCollaboratorPermissions
      onPermissionsChange={(permissions) => setValue(name, permissions)}
      permissions={watch(name) as CollaboratorPermissions}
    />
  )
}

export default PermissionsField
