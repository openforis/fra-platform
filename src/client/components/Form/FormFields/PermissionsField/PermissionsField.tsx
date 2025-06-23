import './PermissionField.scss'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import FormField from 'client/components/Form/FormFields/FormField'
import MultiSelect from 'client/components/Inputs/MultiSelect'

import { FieldProps } from '../types'
import { useGetValue } from './hooks/useGetValue'
import { useOptions } from './hooks/useOptions'

const PermissionsField: React.FC<FieldProps> = (props) => {
  const { control, fieldDefinition } = props
  const { name } = fieldDefinition

  const { t } = useTranslation()
  const options = useOptions()
  const getValue = useGetValue()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField {...props} noBorder>
      <DataGrid className="form-field-permissions" gridTemplateColumns="repeat(2, auto)">
        <DataCell editable lastCol lastRow>
          <div className="form-field-permissions__label">{t('userManagement.permissionNames.tableData')}</div>
          <Controller
            control={control}
            name={`${name}.tableData`}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                classNames={{ container: 'form-field-permissions__container' }}
                onChange={(selectedValues: Array<string>, actionMeta) => onChange(getValue(selectedValues, actionMeta))}
                options={options}
                value={value}
              />
            )}
          />
        </DataCell>

        <DataCell editable lastCol lastRow>
          <div className="form-field-permissions__label">{t('userManagement.permissionNames.descriptions')}</div>
          <Controller
            control={control}
            name={`${name}.descriptions`}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                classNames={{ container: 'form-field-permissions__container' }}
                onChange={(selectedValues: Array<string>, actionMeta) => onChange(getValue(selectedValues, actionMeta))}
                options={options}
                value={value}
              />
            )}
          />
        </DataCell>
      </DataGrid>
    </FormField>
  )
}

export default PermissionsField
