import './PermissionField.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActionMeta } from 'react-select'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import FormField from 'client/components/Form/FormFields/FormField'
import MultiSelect from 'client/components/Inputs/MultiSelect'
import { Option } from 'client/components/Inputs/Select'

import { FieldProps } from '../types'
import { useGetValue } from './hooks/useGetValue'
import { useOptions } from './hooks/useOptions'

interface PermissionsValue {
  tableData: Array<string>
  descriptions: Array<string>
}

const PermissionsField: React.FC<FieldProps> = (props) => {
  const { fieldDefinition, setValue, watch } = props
  const { name } = fieldDefinition

  const { t } = useTranslation()
  const currentPermissions = watch(name) as PermissionsValue
  const options = useOptions()
  const getValue = useGetValue()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField {...props} noBorder>
      <DataGrid className="form-field-permissions" gridTemplateColumns="repeat(2, auto)">
        <DataCell editable lastCol lastRow>
          <div className="form-field-permissions__label">{t('userManagement.permissionNames.tableData')}</div>
          <MultiSelect
            classNames={{ container: 'form-field-permissions__container' }}
            onChange={(selectedValues: Array<string>, actionMeta: ActionMeta<Option>) => {
              setValue(name, getValue(currentPermissions, 'tableData', selectedValues, actionMeta))
            }}
            options={options}
            value={currentPermissions?.tableData}
          />
        </DataCell>

        <DataCell editable lastCol lastRow>
          <div className="form-field-permissions__label">{t('userManagement.permissionNames.descriptions')}</div>
          <MultiSelect
            classNames={{ container: 'form-field-permissions__container' }}
            onChange={(selectedValues: Array<string>, actionMeta: ActionMeta<Option>) => {
              setValue(name, getValue(currentPermissions, 'descriptions', selectedValues, actionMeta))
            }}
            options={options}
            value={currentPermissions?.descriptions}
          />
        </DataCell>
      </DataGrid>
    </FormField>
  )
}

export default PermissionsField
