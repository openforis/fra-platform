import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User, Users } from '@meta/user'

import { useUser } from '@client/store/user'
import TextInput from '@client/components/TextInput'

type TextInputFieldProps = {
  key: string
  onlySelf?: boolean
  validator?: (user: Partial<User>) => boolean
}

const textInputFields: Array<TextInputFieldProps> = [
  { key: 'name', onlySelf: true, validator: Users.validName },
  { key: 'email', validator: Users.validEmail },
  { key: 'institution' },
  { key: 'position' },
]

type Props = {
  onChange: (value: string, key: string) => void
  user: User
}

const TextInputFields = (props: Props) => {
  const { onChange, user } = props
  const { t } = useTranslation()
  const userInfo = useUser()

  return (
    <>
      {textInputFields.map((inputField) => {
        const value = user?.[inputField.key as keyof User]
        const valid = inputField.validator?.({ [inputField.key]: value }) ?? true
        const enabled =
          !inputField.onlySelf ||
          Users.isAdministrator(userInfo) ||
          (inputField.onlySelf === true && user?.id === userInfo?.id)

        return (
          <div className="edit-user__form-item" key={inputField.key}>
            <div className="edit-user__form-label">{t(`editUser.${inputField.key}`)}</div>
            <div className={classNames(`edit-user__form-field${enabled ? '' : '-disabled'}`, { error: !valid })}>
              <TextInput
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, inputField.key)}
                disabled={!enabled}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TextInputFields
