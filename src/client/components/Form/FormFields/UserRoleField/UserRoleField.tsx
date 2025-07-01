import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { RoleName, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import SelectField from 'client/components/Form/FormFields/SelectField'
import { FieldDefinition } from 'client/components/Form/types'
import { Option } from 'client/components/Inputs/Select'

import { FieldProps } from '../types'

const UserRoleField = (props: FieldProps) => {
  const { fieldDefinition: _fieldDefinition } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const cycle = useCycle()

  const options = useMemo<Array<Option>>(() => {
    return Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => ({
      label: t(Users.getI18nRoleLabelKey(role)),
      value: role,
    }))
  }, [countryIso, cycle, t, user])

  const fieldDefinition = useMemo<FieldDefinition>(() => {
    return { ..._fieldDefinition, options }
  }, [_fieldDefinition, options])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SelectField {...props} fieldDefinition={fieldDefinition} />
  )
}

export default UserRoleField
