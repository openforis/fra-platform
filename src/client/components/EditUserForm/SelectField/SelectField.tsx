import './SelectField.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User } from 'meta/user'
import { UserProps } from 'meta/user/user'

import Select, { Option } from 'client/components/Inputs/Select'

type Props = {
  name: string
  value: string
  options: Array<Option>
  onChange: (name: string, value: string) => void
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  enabled?: boolean
  mandatory?: boolean
}

const SelectField: React.FC<Props> = (props) => {
  const { enabled, mandatory, name, onChange, options, validator, value } = props

  const { t } = useTranslation()

  const [valid, setValid] = useState(true)

  useEffect(() => {
    const validationChain = []
    if (mandatory) validationChain.push((value: string) => !!value)
    if (validator) validationChain.push(validator)

    setValid(validationChain.reduce((valid, validationFnc) => valid && validationFnc(value), true))
  }, [mandatory, name, validator, value])

  const _onLocalChange = (value: string) => {
    onChange(name, value)
  }

  return (
    <div key={name} className="edit-user__form-item">
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div
        className={classNames('edit-user__form-field', 'edit-user__form-select-field', {
          disabled: !enabled,
          error: !valid,
        })}
      >
        <Select disabled={!enabled} onChange={_onLocalChange} options={options} value={value} />
      </div>
    </div>
  )
}

export default SelectField
