import './FormField.scss'
import React, { PropsWithChildren, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'
import { ZodOptional } from 'zod'

import { DataCell, DataRow } from 'client/components/DataGrid'
import { FieldProps } from 'client/components/Form/FormFields/types'
import Icon from 'client/components/Icon'

import { useWatches } from './hooks/useWatches'

type Props = PropsWithChildren<FieldProps> & {
  classes?: { cellField?: string }
  renderInput: (props: { disabled: boolean; disabledOptions: Array<string> }) => ReactNode
}

const FormField: React.FC<Props> = (props) => {
  const { classes, error, fieldDefinition, fieldValidationSchema, fullWidth, noBorder, renderInput } = props
  const { label, name } = fieldDefinition
  const required = !Objects.isNil(fieldValidationSchema) && !(fieldValidationSchema instanceof ZodOptional)

  const { t } = useTranslation()
  const { disabled, disabledOptions } = useWatches(props)

  return (
    <DataRow key={name}>
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
        {renderInput({ disabled, disabledOptions })}

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
