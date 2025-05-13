import './PhoneField.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useOnUpdate } from 'client/hooks'

type Props = {
  name: string
  value: string
  onChange: (name: string, value: string) => void
  validator?: (value: string) => boolean
  enabled?: boolean
  mandatory?: boolean
}

const PhoneField: React.FC<Props> = (props) => {
  const { enabled, mandatory, name, onChange, validator, value } = props

  const { t } = useTranslation()

  const [prefix, setPrefix] = useState(value?.split(' ')[0] ?? '')
  const [phoneNumber, setPhoneNumber] = useState(value?.split(' ')[1] ?? '')
  const [valid, setValid] = useState(true)

  useEffect(() => {
    const validationChain = []
    if (mandatory) validationChain.push((value: string) => !!value)
    if (validator) validationChain.push(validator)

    setValid(validationChain.reduce((valid, validationFnc) => valid && validationFnc(value), true))
  }, [mandatory, name, validator, value])

  useOnUpdate(() => {
    onChange(name, prefix === '' || phoneNumber === '' ? '' : `${prefix} ${phoneNumber}`)
  }, [prefix, phoneNumber])

  return (
    <div key={name} className="edit-user__form-item">
      <div className="edit-user__form-label">
        {t(`editUser.${name}`)}
        {mandatory && '*'}
      </div>
      <div
        className={classNames('edit-user__form-field', 'edit-user__form-phone-field', {
          disabled: !enabled,
          error: !valid,
        })}
      >
        <input
          defaultValue={prefix}
          disabled={!enabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrefix(e.target.value.trim())}
          type="text"
        />

        <input
          defaultValue={phoneNumber}
          disabled={!enabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value.trim())}
          type="text"
        />
      </div>
    </div>
  )
}

export default PhoneField
