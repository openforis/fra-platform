import React from 'react'
import { useTranslation } from 'react-i18next'

import { User, UserStatus } from 'meta/user'

type Props = {
  changeUser: (name: string, value: string) => void
  user: User
}

const DisableUser: React.FC<Props> = (props: Props) => {
  const { changeUser, user } = props
  const { t } = useTranslation()

  const disabled = user.status === UserStatus.disabled

  return (
    <div className="edit-user__form-item edit-user__form-item-roles">
      <div className="edit-user__form-label">{t('editUser.disabled')}</div>
      <input
        type="checkbox"
        name="disabled"
        checked={disabled}
        onChange={(event) => {
          changeUser('status', event.target.checked ? UserStatus.disabled : UserStatus.active)
        }}
      />
    </div>
  )
}

export default DisableUser
