import './TitleField.scss'
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
  mandatory?: boolean
}

const TitleField: React.FC<Props> = (props) => {
  const { name, value, onChange, validator, enabled, mandatory } = props

  const { t } = useTranslation()

  const options = { Ms: 'Ms', Mr: 'Mr', Other: 'Other' }

  const valid = validator?.({ [name]: value }) ?? true

  const [title, setTitle] = useState(value)

  useOnUpdate(() => {
    onChange(name, title)
  }, [title])

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">
        {t(`editUser.${name}`)}
        {mandatory && '*'}
      </div>
      <div
        className={classNames('edit-user__form-field', 'edit-user__form-title-field ', {
          disabled: !enabled,
          error: !valid,
        })}
      >
        <select
          value={title}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setTitle(e.target.value)
          }}
        >
          <option value="">{t('userManagement.placeholder')}</option>
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

TitleField.defaultProps = {
  validator: undefined,
  enabled: false,
  mandatory: false,
}

export default TitleField
