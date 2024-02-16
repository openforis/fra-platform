import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  onChange: (name: string, value: boolean) => void
  value: boolean
  name: string
}

const InputFieldCheckbox: React.FC<Props> = (props: Props) => {
  const { onChange, value = false, name } = props
  const { t } = useTranslation()

  const _onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange(name, event.target.checked),
    [name, onChange]
  )

  const id = `repository_edit-input-access`

  return (
    <div>
      <input checked={value} id={id} onChange={_onChange} name="access" type="checkbox" />
      <label htmlFor={id}>{t('common.public')}</label>
    </div>
  )
}

export default InputFieldCheckbox
