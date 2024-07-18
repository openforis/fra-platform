import './TextInputField.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'

type Props = {
  editorLink?: boolean
  enabled?: boolean
  mandatory?: boolean
  name: string
  onChange: (name: string, value: string) => void
  validator?: (value: string) => boolean
  value: string
}

const TextInputField: React.FC<Props> = (props) => {
  const { editorLink, name, value, onChange, validator, enabled, mandatory } = props

  const { t } = useTranslation()

  const [valid, setValid] = useState(true)

  useEffect(() => {
    const validationChain = []
    if (mandatory) validationChain.push((value: string) => !!value)
    if (validator) validationChain.push(validator)

    setValid(validationChain.reduce((valid, validationFnc) => valid && validationFnc(value), true))
  }, [mandatory, name, validator, value])

  return (
    <div key={name} className={classNames('edit-user__form-item', { editorLink })}>
      <div className="edit-user__form-label">
        {t(`editUser.${name}`)}
        {mandatory && '*'}
      </div>
      <div
        className={classNames('edit-user__form-field', 'edit-user__form-input-text-field', {
          disabled: !enabled,
          error: !valid,
        })}
      >
        {editorLink && <EditorWYSIWYGLinks onChange={(_value) => onChange(name, _value)} value={value} />}

        {!editorLink && (
          <input
            defaultValue={value}
            disabled={!enabled}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(name, e.target.value.trim())}
            type="text"
          />
        )}
      </div>
    </div>
  )
}

TextInputField.defaultProps = {
  editorLink: false,
  enabled: false,
  mandatory: false,
  validator: undefined,
}

export default TextInputField
