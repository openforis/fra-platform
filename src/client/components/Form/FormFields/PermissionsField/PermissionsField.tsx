import './PermissionField.scss'
import React from 'react'
import { Controller, FieldError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import FormField from 'client/components/Form/FormFields/FormField'
import { useIsFieldDisabled } from 'client/components/Form/FormFields/hooks/useIsFieldDisabled'
import Icon from 'client/components/Icon'
import MultiSelect from 'client/components/Inputs/MultiSelect'

import { FieldProps } from '../types'
import { useGetValue } from './hooks/useGetValue'
import { useOptions } from './hooks/useOptions'

type PermissionsFieldError = {
  tableData?: FieldError
  descriptions?: FieldError
}

type Props = Omit<FieldProps, 'error'> & {
  error?: PermissionsFieldError
}

const PermissionsField: React.FC<Props> = (props) => {
  const { control, error, fieldDefinition } = props
  const { name } = fieldDefinition

  const { t } = useTranslation()
  const options = useOptions()
  const getValue = useGetValue()
  const disabled = useIsFieldDisabled(props)

  const tableDataError = error?.tableData
  const descriptionsError = error?.descriptions

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField {...props} error={undefined} noBorder>
      <DataGrid className="form-field-permissions" gridTemplateColumns="repeat(2, 1fr)">
        <DataCell editable lastCol lastRow>
          <div className="form-field-permissions__label">{t('userManagement.permissionNames.tableData')}</div>
          <Controller
            control={control}
            disabled={disabled}
            name={`${name}.tableData`}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                classNames={{ container: 'form-field-permissions__container' }}
                disabled={disabled}
                onChange={(selectedValues: Array<string>, actionMeta) => onChange(getValue(selectedValues, actionMeta))}
                options={options}
                value={value}
              />
            )}
          />
          {tableDataError && (
            <div className="form-cell-error">
              <Icon name="alert" />
              {tableDataError.message}
            </div>
          )}
        </DataCell>

        <DataCell editable lastCol lastRow>
          <div className="form-field-permissions__label">{t('userManagement.permissionNames.descriptions')}</div>
          <Controller
            control={control}
            disabled={disabled}
            name={`${name}.descriptions`}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                classNames={{ container: 'form-field-permissions__container' }}
                disabled={disabled}
                onChange={(selectedValues: Array<string>, actionMeta) => onChange(getValue(selectedValues, actionMeta))}
                options={options}
                value={value}
              />
            )}
          />
          {descriptionsError && (
            <div className="form-cell-error">
              <Icon name="alert" />
              {descriptionsError.message}
            </div>
          )}
        </DataCell>
      </DataGrid>
    </FormField>
  )
}

export default PermissionsField
