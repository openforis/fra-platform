import React from 'react'
import TextInput from '@webapp/components/textInput'
import { isAdministrator } from '@common/countryRole'
import { useI18n, useUserInfo } from '@webapp/components/hooks'
import { validName } from '@common/userUtils'
import { validEmail } from '../../../../../../../common/userUtils'

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
  const i18n = useI18n()
  const userInfo = useUserInfo()

  return (
    <>
      {textInputFields.map((inputField) => {
        const allowed = !inputField.type || inputField.type === user.type
        if (!allowed) return null

        const value = user?.[inputField.key]
        const valid = inputField.validator?.({ [inputField.key]: value }) ?? true

        const disabled = inputField.disabled || (inputField.onlyAdmin && !isAdministrator(userInfo))
        let className = 'edit-user__form-field'
        if (disabled) className += '-disabled'
        if (!valid) className += ' error'

        return (
          <div className="edit-user__form-item" key={inputField.key}>
            <div className="edit-user__form-label">{i18n.t(`editUser.${inputField.key}`)}</div>
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
