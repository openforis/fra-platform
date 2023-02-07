import React from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, UserContactPreferenceMethod, UserRole } from '@meta/user/userRole'

import SelectField from '../SelectField'
import TextInputField from '../TextInputField'

type Props = {
  role: UserRole<any, any>
  onChange: (name: string, value: any) => void
  enabled?: boolean
}

const UserRolePropsFields: React.FC<Props> = (props) => {
  const { role, onChange, enabled } = props

  const { props: roleProps } = role

  const { t } = useTranslation()

  const changeAddress = (name: string, value: string) => onChange('address', { ...roleProps.address, [name]: value })

  const changeContactPreference = (name: string, value: string) =>
    onChange('contactPreference', { ...roleProps.contactPreference, [name]: value })

  return (
    <>
      <TextInputField
        name="professionalTitle"
        value={roleProps.professionalTitle}
        onChange={onChange}
        enabled={enabled}
      />

      <TextInputField
        name="organizationalUnit"
        value={roleProps.organizationalUnit}
        onChange={onChange}
        enabled={enabled}
      />

      <TextInputField name="organization" value={roleProps.organization} onChange={onChange} enabled={enabled} />

      {[RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT].includes(role.role) && (
        <>
          <TextInputField name="street" value={roleProps.address.street} onChange={changeAddress} enabled={enabled} />

          <TextInputField name="zipCode" value={roleProps.address.zipCode} onChange={changeAddress} enabled={enabled} />

          <TextInputField name="poBox" value={roleProps.address.poBox} onChange={changeAddress} enabled={enabled} />

          <TextInputField name="city" value={roleProps.address.city} onChange={changeAddress} enabled={enabled} />

          <TextInputField
            name="countryIso"
            value={roleProps.address.countryIso}
            onChange={changeAddress}
            enabled={enabled}
          />

          <TextInputField name="primaryEmail" value={roleProps.primaryEmail} onChange={onChange} enabled={enabled} />

          <TextInputField
            name="secondaryEmail"
            value={roleProps.secondaryEmail}
            onChange={onChange}
            enabled={enabled}
          />

          <TextInputField
            name="primaryPhoneNumber"
            value={roleProps.primaryPhoneNumber}
            onChange={onChange}
            enabled={enabled}
          />

          <TextInputField
            name="secondaryPhoneNumber"
            value={roleProps.secondaryPhoneNumber}
            onChange={onChange}
            enabled={enabled}
          />

          <TextInputField name="skype" value={roleProps.skype} onChange={onChange} enabled={enabled} />

          <SelectField
            name="contactPreference"
            value={roleProps.contactPreference?.method}
            options={Object.values(UserContactPreferenceMethod).reduce(
              (acc, k) => ({ ...acc, [k]: t(`editUser.${k}`) }),
              {}
            )}
            onChange={changeContactPreference}
            enabled={enabled}
          />
        </>
      )}
    </>
  )
}

UserRolePropsFields.defaultProps = {
  enabled: false,
}

export default UserRolePropsFields
