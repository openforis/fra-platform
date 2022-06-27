import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'

import { Users } from '@meta/user'

import { useUser } from '@client/store/user'
import TextInput from '@client/components/TextInput'

// validation methods
export const validName = (user: any) => !Objects.isEmpty(user.name)
export const validRole = (user: any) => !Objects.isEmpty(user.roles)

export const validEmail = (user: any) => {
  // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const re = /.+@.+/
  return re.test(user.email)
}

const textInputFields = [
  { key: 'name', onlyAdmin: true, validator: validName },
  { key: 'email', validator: validEmail },
  { key: 'loginEmail', disabled: true, type: 'google' },
  { key: 'institution' },
  { key: 'position' },
]

type Props = {
  onChange: (value: string, key: string) => void
  user: any
}

const TextInputFields = (props: Props) => {
  const { onChange, user } = props
  const { i18n } = useTranslation()
  const userInfo = useUser()

  return (
    <>
      {textInputFields.map((inputField) => {
        const allowed = !inputField.type || inputField.type === user.type
        if (!allowed) return null

        const value = user?.[inputField.key]
        const valid = inputField.validator?.({ [inputField.key]: value }) ?? true

        const disabled = inputField.disabled || (inputField.onlyAdmin && !Users.isAdministrator(userInfo))
        let className = 'edit-user__form-field'
        if (disabled) className += '-disabled'
        if (!valid) className += ' error'

        return (
          <div className="edit-user__form-item" key={inputField.key}>
            <div className="edit-user__form-label">{i18n.t<string>(`editUser.${inputField.key}`)}</div>
            <div className={className}>
              <TextInput
                value={value}
                onChange={({ target: { value } }: any) => onChange(value, inputField.key)}
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
