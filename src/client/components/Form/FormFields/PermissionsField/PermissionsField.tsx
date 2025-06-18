import React from 'react'
import { useTranslation } from 'react-i18next'

import { CollaboratorPermissions } from 'meta/user'

import { DataCell, DataRow } from 'client/components/DataGrid'
import InviteCollaboratorPermissions from 'client/components/InviteUserForm/InviteCollaboratorPermissions'

import { FieldProps } from '../types'

const PermissionsField = (props: FieldProps) => {
  const { errors, label, name, setValue, shouldShow, watch } = props
  const { t } = useTranslation()
  const watchValues = watch()

  if (shouldShow && !shouldShow(watchValues)) {
    return null
  }

  return (
    <DataRow>
      <DataCell className="form-cell-label" noBorder>
        <label htmlFor={name}>{t(label)}</label>
      </DataCell>
      <DataCell editable lastCol lastRow>
        <InviteCollaboratorPermissions
          onPermissionsChange={(permissions) => setValue(name, permissions)}
          permissions={watch(name) as CollaboratorPermissions}
        />
        {errors[name] && <div className="form-cell-error">{errors[name].message}</div>}
      </DataCell>
    </DataRow>
  )
}

export default PermissionsField
