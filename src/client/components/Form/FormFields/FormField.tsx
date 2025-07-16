import './FormField.scss'
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'
import { ZodOptional } from 'zod'

import { DataCell, DataRow } from 'client/components/DataGrid'
import { FieldProps } from 'client/components/Form/FormFields/types'
import Icon from 'client/components/Icon'

import { useTriggerOnChange } from './hooks/useTriggerOnChange'

type Props = PropsWithChildren<FieldProps> & {
  classes?: { cellField?: string }
  disabled?: boolean
}

const FormField: React.FC<Props> = (props) => {
  const { children, classes, disabled, error, fieldDefinition, fieldValidationSchema, fullWidth, noBorder } = props
  const { label, name } = fieldDefinition
  const required = !Objects.isNil(fieldValidationSchema) && !(fieldValidationSchema instanceof ZodOptional)

  const { t } = useTranslation()
  useTriggerOnChange(props)

  return (
    <DataRow>
      <DataCell className="form-cell-label" noBorder>
        <label htmlFor={name}>
          {t(label)}
          {required && '*'}
        </label>
      </DataCell>

      <DataCell
        className={classNames('form-cell-field', classes?.cellField, { disabled, 'form-field__full-width': fullWidth })}
        editable
        lastCol
        lastRow
        noBorder={noBorder}
      >
        {React.Children.toArray(children)}

        {error && (
          <div className="form-cell-error">
            <Icon name="alert" />
            {error?.message as string}
          </div>
        )}
      </DataCell>
    </DataRow>
  )
}

export default FormField
