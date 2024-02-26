import './InputFieldCheckbox.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useIsFileInUse } from 'client/store/ui/repository'
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
  const disabled = useIsFileInUse()

  const _onChange = useCallback(() => onChange(name, !value), [name, onChange, value])

  const id = `repository_edit-input-access`

  return (
    <>
      <DataCell noBorder>
        <label className="repository-form__label" htmlFor={id}>
          {t('common.public')}
        </label>
      </DataCell>
      <DataCell className="repository-form__checkbox" noBorder>
        <ButtonCheckBox checked={value} disabled={disabled} label="" onClick={_onChange} />
      </DataCell>
    </>
  )
}

export default InputFieldCheckbox
