import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User, Users } from '@meta/user'
import { UserProps } from '@meta/user/user'

import { useUser } from '@client/store/user'

type Props = {
  name: string
  onChange: (user: User) => void
  user: User
  onlySelf?: boolean
  isProperty?: boolean
}

const SelectField = (props: Props) => {
  const { name, onChange, user, onlySelf, isProperty } = props

  const { t } = useTranslation()
  const userInfo = useUser()

  const value = isProperty ? (user?.props[name as keyof UserProps] as string) : (user?.[name as keyof User] as string)

  const valid = false

  const enabled = !onlySelf || Users.isAdministrator(userInfo) || (onlySelf === true && user?.id === userInfo?.id)

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div className={classNames(`edit-user__form-field${enabled ? '' : '-disabled'}`, { error: !valid })}>
        <select
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            isProperty
              ? onChange({ ...user, props: { ...user.props, [name]: e.target.value } })
              : onChange({ ...user, [name]: e.target.value })
          }
        >
          {!value && <option value=""> </option>}
          {['Ms', 'Mr', 'Other'].map((title: string) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

SelectField.defaultProps = {
  onlySelf: false,
  isProperty: false,
}

export default SelectField
