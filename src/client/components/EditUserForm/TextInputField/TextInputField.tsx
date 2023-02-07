import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User } from '@meta/user'
import { UserProps } from '@meta/user/user'

import TextInput from '@client/components/TextInput'

type Props = {
  name: string
  value: string
  onChange: (name: string, value: string) => void
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  enabled?: boolean
}

const TextInputField = (props: Props) => {
  const { name, value, onChange, validator, enabled } = props

  const { t } = useTranslation()

  const valid = validator?.({ [name]: value }) ?? true

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div className={classNames(`edit-user__form-field${enabled ? '' : '-disabled'}`, { error: !valid })}>
        <TextInput
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(name, e.target.value)}
          disabled={!enabled}
        />
      </div>
    </div>
  )
}

TextInputField.defaultProps = {
  validator: undefined,
  enabled: false,
}

export default TextInputField
