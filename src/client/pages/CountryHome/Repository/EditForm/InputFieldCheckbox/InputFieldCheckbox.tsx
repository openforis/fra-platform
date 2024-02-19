import './InputFieldCheckbox.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import ButtonCheckBox from 'client/components/ButtonCheckBox'
import { DataCell } from 'client/components/DataGrid'

type Props = {
  onChange: (name: string, value: boolean) => void
  value: boolean
  name: string
}

const InputFieldCheckbox: React.FC<Props> = (props: Props) => {
  const { onChange, value = false, name } = props
  const { t } = useTranslation()

  const _onChange = useCallback(() => onChange(name, !value), [name, onChange, value])

  const id = `repository_edit-input-access`

  return (
    <>
      <DataCell noBorder>
        <label htmlFor={id} className="repository-form__label">
          {t('common.public')}
        </label>
      </DataCell>
      <DataCell className="repository-form__checkbox" noBorder>
        <ButtonCheckBox onClick={_onChange} checked={value} label="" />
      </DataCell>
    </>
  )
}

export default InputFieldCheckbox
