import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User, Users } from '@meta/user'
import { UserProps } from '@meta/user/user'

import { useUser } from '@client/store/user'
import TextInput from '@client/components/TextInput'

type Props = {
  name: string
  onChange: (user: User) => void
  user: User
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  onlySelf?: boolean
  isProperty?: boolean
}

const TextInputField = (props: Props) => {
  const { name, onChange, user, validator, onlySelf, isProperty } = props

  const { t } = useTranslation()
  const userInfo = useUser()

  const value = isProperty ? user?.props[name as keyof UserProps] : user?.[name as keyof User]

  const valid = validator?.({ [name]: value }) ?? true

  const enabled = !onlySelf || Users.isAdministrator(userInfo) || (onlySelf === true && user?.id === userInfo?.id)

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div className={classNames(`edit-user__form-field${enabled ? '' : '-disabled'}`, { error: !valid })}>
        <TextInput
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            isProperty
              ? onChange({ ...user, props: { ...user.props, [name]: e.target.value } })
              : onChange({ ...user, [name]: e.target.value })
          }
          disabled={!enabled}
        />
      </div>
    </div>
  )
}

TextInputField.defaultProps = {
  validator: undefined,
  onlySelf: false,
  isProperty: false,
}

export default TextInputField
