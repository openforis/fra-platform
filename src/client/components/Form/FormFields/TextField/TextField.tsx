import React from 'react'
import { useTranslation } from 'react-i18next'

import { DataCell, DataRow } from 'client/components/DataGrid'
import InputText from 'client/components/Inputs/InputText'

import { FieldProps } from '../types'

const TextField = (props: FieldProps) => {
  const { errors, label, name, register, required } = props
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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <InputText id={name} name={name} {...register(name)} />
        {errors[name] && <div className="form-cell-error">{errors[name].message}</div>}
      </DataCell>
    </DataRow>
  )
}

export default TextField
