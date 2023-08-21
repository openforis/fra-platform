import './CountrySelectField.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { User } from 'meta/user'
import { UserProps } from 'meta/user/user'

import { useCountryIso } from 'client/hooks'
import AreaSelector from 'client/components/AreaSelector/AreaSelector'

type Props = {
  name: string
  value: string
  onChange: (name: string, value: string) => void
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  enabled?: boolean
}

const CountrySelectField: React.FC<Props> = (props) => {
  const { name, value, onChange, validator, enabled } = props

  const defaultCountryIso = useCountryIso()

  const { t } = useTranslation()

  const valid = validator?.({ [name]: value }) ?? true

  return (
    <div className="edit-user__form-item" key={name}>
      <div className="edit-user__form-label">{t(`editUser.${name}`)}</div>
      <div className={classNames('edit-user__form-field', { disabled: !enabled, error: !valid })}>
        <AreaSelector
          disabled={!enabled}
          includeCountries
          onElementSelect={(countryIso: CountryIso) => onChange(name, countryIso)}
          showCountryFlag
          selectedValue={Objects.isEmpty(value) ? defaultCountryIso : (value as CountryIso)}
        />
      </div>
    </div>
  )
}

CountrySelectField.defaultProps = {
  validator: undefined,
  enabled: false,
}

export default CountrySelectField
