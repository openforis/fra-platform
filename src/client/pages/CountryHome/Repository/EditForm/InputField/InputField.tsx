import './InputField.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useRepositoryItemPropValidation } from 'client/store/ui/repository'
import { DataCell } from 'client/components/DataGrid'
import InputText from 'client/components/Inputs/InputText'

type Props = {
  label: string
  name: string
  onChange: (name: string, value: string) => void
  value: string
}

const InputField: React.FC<Props> = (props: Props) => {
  const { label, name, onChange, value } = props

  const { t } = useTranslation()

  const _onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange(name, event.target.value),
    [name, onChange]
  )

  const id = `repository_edit-input-${name}`
  const error = useRepositoryItemPropValidation(name)

  return (
    <>
      <DataCell error={Boolean(error)} noBorder>
        <label htmlFor={id} className="repository-form__label">
          {t(label)}
        </label>
      </DataCell>
      <DataCell className="repository-form__field" editable error={Boolean(error)} lastCol lastRow>
        <InputText id={id} onChange={_onChange} value={value ?? ''} />
        <div className="repository-form__error-label">{error ? t(error) : ''}</div>
      </DataCell>
    </>
  )
}

export default InputField
