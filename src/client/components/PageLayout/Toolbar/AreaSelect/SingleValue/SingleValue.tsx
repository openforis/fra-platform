import './SingleValue.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { components, SingleValueProps } from 'react-select'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { Option } from 'client/components/Inputs/Select'
import { OptionsGroupArea } from 'client/components/PageLayout/Toolbar/AreaSelect/types'

type Props = SingleValueProps<Option, boolean, OptionsGroupArea>

const SingleValue: React.FC<Props> = (props) => {
  const { data } = props
  const { label, value } = data
  const countryIso = value as CountryIso

  const { t } = useTranslation()
  const cycle = useCycle()
  const user = useUser()
  const isCountry = Areas.isISOCountry(value)
  const role = Users.getRole(user, countryIso, cycle)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.SingleValue {...props}>
      <div className="area-select__single-value">
        {isCountry && <div className="flag" style={{ backgroundImage: Areas.getCountryBackgroundImg(countryIso) }} />}
        <div className="label-container">
          <div className="country-name">{label}</div>
          {role && <div className="user-role">{t(Users.getI18nRoleLabelKey(role.role))}</div>}
        </div>
      </div>
    </components.SingleValue>
  )
}

export default SingleValue
