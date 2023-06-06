import './ContactMethodField.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User } from 'meta/user'
import { UserProps } from 'meta/user/user'
import {
  UserContactPreference,
  UserContactPreferenceMethod,
  UserContactPreferencePhoneOption,
} from 'meta/user/userRole'

import { useOnUpdate } from 'client/hooks'

type Props = {
  name: string
  value: UserContactPreference
  onChange: (value: UserContactPreference) => void
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  enabled?: boolean
}

const ContactMethodField: React.FC<Props> = (props) => {
  const { name, value, onChange, validator, enabled } = props

  const { t } = useTranslation()

  const methodOptions = Object.values(UserContactPreferenceMethod).reduce<Record<string, string>>(
    (acc, k) => ({ ...acc, [k]: t(`editUser.${k}`) }),
    {}
  )

  const phoneOptions = {
    [UserContactPreferencePhoneOption.signal]: 'Signal',
    [UserContactPreferencePhoneOption.whatsapp]: 'Whatsapp',
  }

  const valid = validator?.({ [name]: value }) ?? true

  const [method, setMethod] = useState(value?.method)
  const [phoneOption, setPhoneOption] = useState(
    [UserContactPreferenceMethod.primaryPhoneNumber, UserContactPreferenceMethod.secondaryPhoneNumber].includes(
      value?.method
    )
      ? value.options?.phone
      : ''
  )

  useOnUpdate(() => {
    const newValue = { method } as UserContactPreference

    if (phoneOption) {
      newValue.options = { phone: phoneOption as UserContactPreferencePhoneOption }
    }

    onChange(newValue)
  }, [method, phoneOption])

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div
        className={classNames('edit-user__form-field', 'edit-user__form-contact_method-field', {
          disabled: !enabled,
          error: !valid,
        })}
      >
        <select
          value={method}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setMethod(e.target.value as UserContactPreferenceMethod)
            setPhoneOption('')
          }}
        >
          <option value="">{t('userManagement.placeholder')}</option>
          {Object.entries(methodOptions).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>

        <select
          value={phoneOption}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setPhoneOption(e.target.value)
          }}
          disabled={
            !enabled ||
            ![
              UserContactPreferenceMethod.primaryPhoneNumber,
              UserContactPreferenceMethod.secondaryPhoneNumber,
            ].includes(method)
          }
        >
          <option value="">{t('userManagement.placeholder')}</option>
          {Object.entries(phoneOptions).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

ContactMethodField.defaultProps = {
  validator: undefined,
  enabled: false,
}

export default ContactMethodField
