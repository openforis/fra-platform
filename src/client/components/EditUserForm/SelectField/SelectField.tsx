import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User } from '@meta/user'
import { UserProps } from '@meta/user/user'

type Props = {
  name: string
  value: string
  options: Record<string, string>
  onChange: (name: string, value: string) => void
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  enabled?: boolean
}

const SelectField: React.FC<Props> = (props) => {
  const { name, value, options, onChange, validator, enabled } = props

  const { t } = useTranslation()

  const valid = validator?.({ [name]: value }) ?? true

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div className={classNames('edit-user__form-field', { disabled: !enabled, error: !valid })}>
        <select value={value} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(name, e.target.value)}>
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
}

export default SelectField
