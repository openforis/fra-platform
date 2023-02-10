import './PhoneField.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User } from '@meta/user'
import { UserProps } from '@meta/user/user'

import { useOnUpdate } from '@client/hooks'

type Props = {
  name: string
  value: string
  onChange: (name: string, value: string) => void
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  enabled?: boolean
}

const PhoneField: React.FC<Props> = (props) => {
  const { name, value, onChange, validator, enabled } = props

  const { t } = useTranslation()

  const valid = validator?.({ [name]: value }) ?? true

  const [prefix, setPrefix] = useState(value?.split(' ')[0] ?? '')
  const [phoneNumber, setPhoneNumber] = useState(value?.split(' ')[1] ?? '')

  useOnUpdate(() => {
    onChange(name, prefix === '' || phoneNumber === '' ? '' : `${prefix} ${phoneNumber}`)
  }, [prefix, phoneNumber])

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div
        className={classNames('edit-user__form-phone-field ', `edit-user__form-field${enabled ? '' : '-disabled'}`, {
          error: !valid,
        })}
      >
        <input
          type="text"
          value={prefix}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrefix(e.target.value.trim())}
          disabled={!enabled}
        />

        <input
          type="text"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value.trim())}
          disabled={!enabled}
        />
      </div>
    </div>
  )
}

PhoneField.defaultProps = {
  validator: undefined,
  enabled: false,
}

export default PhoneField
