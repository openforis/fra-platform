import './TextInputField.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

type Props = {
  name: string
  value: string
  onChange: (name: string, value: string) => void
  validator?: (value: string) => boolean
  enabled?: boolean
  mandatory?: boolean
}

const TextInputField: React.FC<Props> = (props) => {
  const { name, value, onChange, validator, enabled, mandatory } = props

  const { t } = useTranslation()

  const [valid, setValid] = useState(true)

  useEffect(() => {
    const validationChain = []
    if (mandatory) validationChain.push((value: string) => !!value)
    if (validator) validationChain.push(validator)

    setValid(validationChain.reduce((valid, validationFnc) => valid && validationFnc(value), true))
  }, [mandatory, name, validator, value])

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">
        {t(`editUser.${name}`)}
        {mandatory && '*'}
      </div>
      <div
        className={classNames('edit-user__form-field', 'edit-user__form-input-text-field', {
          disabled: !enabled,
          error: !valid,
        })}
      >
        <input
          type="text"
          defaultValue={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(name, e.target.value.trim())}
          disabled={!enabled}
        />
      </div>
    </div>
  )
}

TextInputField.defaultProps = {
  validator: undefined,
  enabled: false,
  mandatory: false,
}

export default TextInputField
