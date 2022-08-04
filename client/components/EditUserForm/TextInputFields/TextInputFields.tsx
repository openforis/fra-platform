import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User, Users } from '@meta/user'

import { useUser } from '@client/store/user'
import TextInput from '@client/components/TextInput'

const textInputFields = [
  { key: 'name', onlyAdmin: true, validator: Users.validName },
  { key: 'email', validator: Users.validEmail },
  { key: 'loginEmail', disabled: true, type: 'google' },
  { key: 'institution' },
  { key: 'position' },
]

type Props = {
  onChange: (value: string, key: string) => void
  user: User
}

const TextInputFields = (props: Props) => {
  const { onChange, user } = props
  const { i18n } = useTranslation()
  const userInfo = useUser()

  return (
    <>
      {textInputFields.map((inputField) => {
        // TODO
        // const allowed = !inputField.type || inputField.type === user.type
        const allowed = !inputField.type
        if (!allowed) return null

        const value = user?.[inputField.key as keyof User]
        const valid = inputField.validator?.({ [inputField.key]: value }) ?? true
        const disabled = inputField.disabled || (inputField.onlyAdmin && !Users.isAdministrator(userInfo))

        return (
          <div className="edit-user__form-item" key={inputField.key}>
            <div className="edit-user__form-label">{i18n.t<string>(`editUser.${inputField.key}`)}</div>
            <div className={classNames(`edit-user__form-field${disabled ? '-disabled' : ''}`, { error: !valid })}>
              <TextInput
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, inputField.key)}
                disabled={disabled}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TextInputFields
