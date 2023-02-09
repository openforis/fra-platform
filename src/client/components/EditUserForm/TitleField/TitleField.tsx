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
}

const TitleField: React.FC<Props> = (props) => {
  const { name, value, onChange, validator, enabled } = props

  const { t } = useTranslation()

  const options = { Ms: 'Ms', Mr: 'Mr', Other: 'Other' }

  const valid = validator?.({ [name]: value }) ?? true

  const [title, setTitle] = useState(['Ms', 'Mr'].includes(value) ? value : 'Other')
  const [otherTitle, setOtherTitle] = useState(['Ms', 'Mr'].includes(value) ? '' : value)

  useOnUpdate(() => {
    onChange(name, title === 'Other' ? otherTitle : title)
  }, [title, otherTitle])

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div
        className={classNames('edit-user__form-title-field ', `edit-user__form-field${enabled ? '' : '-disabled'}`, {
          error: !valid,
        })}
      >
        <select
          value={title}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setTitle(e.target.value)
            setOtherTitle('')
          }}
        >
          {Object.entries(options).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={otherTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtherTitle(e.target.value)}
          disabled={!enabled || title !== 'Other'}
        />
      </div>
    </div>
  )
}

TitleField.defaultProps = {
  validator: undefined,
  enabled: false,
}

export default TitleField
