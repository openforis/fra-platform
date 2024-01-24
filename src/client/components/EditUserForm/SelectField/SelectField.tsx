import './SelectField.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User } from 'meta/user'
import { UserProps } from 'meta/user/user'

type Props = {
  name: string
  value: string
  options: Record<string, string>
  onChange: (name: string, value: string) => void
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  enabled?: boolean
  mandatory?: boolean
  placeholder?: boolean
}

const SelectField: React.FC<Props> = (props) => {
  const { name, value, options, onChange, validator, enabled, mandatory, placeholder } = props

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
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div
        className={classNames('edit-user__form-field', 'edit-user__form-select-field', {
          disabled: !enabled,
          error: !valid,
        })}
      >
        <select
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(name, e.target.value)}
          disabled={!enabled}
        >
          {placeholder && <option value="">{t('userManagement.placeholder')}</option>}
          {Object.entries(options).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

SelectField.defaultProps = {
  validator: undefined,
  enabled: false,
  mandatory: false,
  placeholder: true,
}

export default SelectField
