import React from 'react'
import { useTranslation } from 'react-i18next'

import { DataCell, DataRow } from 'client/components/DataGrid'
import Select from 'client/components/Inputs/Select'

import { FieldProps } from '../types'

const SelectField = (props: FieldProps) => {
  const { errors, label, name, options = [], placeholder, required, setValue, watch } = props
  const { t } = useTranslation()

  return (
    <DataRow>
      <DataCell className="form-cell-label" noBorder>
        <label htmlFor={name}>
          {t(label)}
          {required ? '*' : ''}
        </label>
      </DataCell>
      <DataCell editable lastCol lastRow>
        <Select
          isClearable={false}
          onChange={(value) => setValue(name, value as string)}
          options={options}
          placeholder={placeholder}
          value={watch(name) as string}
        />
        {errors[name] && <div className="form-cell-error">{errors[name].message}</div>}
      </DataCell>
    </DataRow>
  )
}

export default SelectField
