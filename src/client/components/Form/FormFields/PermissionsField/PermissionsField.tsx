import './PermissionField.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CollaboratorPermissions } from 'meta/user'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import FormField from 'client/components/Form/FormFields/FormField'
import MultiSelect from 'client/components/Inputs/MultiSelect'
import InviteCollaboratorPermissions from 'client/components/InviteUserForm/InviteCollaboratorPermissions'

import { FieldProps } from '../types'

const PermissionsField: React.FC<FieldProps> = (props) => {
  const { fieldDefinition, setValue, watch } = props
  const { name } = fieldDefinition

  const { t } = useTranslation()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField {...props} noBorder>
      <DataGrid className="form-field-permissions" gridTemplateColumns="repeat(2, auto)">
        <DataCell editable lastCol lastRow>
          <MultiSelect
            classNames={{ container: 'form-field-permissions__container' }}
            onChange={(value) => {
              setValue(name, value)
            }}
            options={[]}
            placeholder={t('userManagement.permissionNames.tableData')}
          />
        </DataCell>

        <DataCell editable lastCol lastRow>
          <MultiSelect
            classNames={{ container: 'form-field-permissions__container' }}
            onChange={(value) => {
              setValue(name, value)
            }}
            options={[]}
            placeholder={t('userManagement.permissionNames.descriptions')}
          />
        </DataCell>
      </DataGrid>
    </FormField>
  )

  return (
    <InviteCollaboratorPermissions
      onPermissionsChange={(permissions) => setValue(name, permissions)}
      permissions={watch(name) as CollaboratorPermissions}
    />
  )
}

export default PermissionsField
