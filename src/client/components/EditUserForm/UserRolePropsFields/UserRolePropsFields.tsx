import React from 'react'

import { RoleName, UserContactPreference, UserRole } from '@meta/user/userRole'

import ContactMethodField from '../ContactMethodField'
import PhoneField from '../PhoneField'
import TextInputField from '../TextInputField'

type Props = {
  role: UserRole<any, any>
  onChange: (name: string, value: any) => void
  enabled?: boolean
}

const UserRolePropsFields: React.FC<Props> = (props) => {
  const { role, onChange, enabled } = props

  const { props: roleProps } = role

  const changeAddress = (name: string, value: string) => onChange('address', { ...roleProps.address, [name]: value })

  const changeContactPreference = (value: UserContactPreference) => onChange('contactPreference', value)

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
          <TextInputField
            name="street"
            value={roleProps.address?.street}
            onChange={changeAddress}
            enabled={enabled}
            mandatory
          />

          <TextInputField
            name="zipCode"
            value={roleProps.address?.zipCode}
            onChange={changeAddress}
            enabled={enabled}
            mandatory
          />

          <TextInputField name="poBox" value={roleProps.address?.poBox} onChange={changeAddress} enabled={enabled} />

          <TextInputField
            name="city"
            value={roleProps.address?.city}
            onChange={changeAddress}
            enabled={enabled}
            mandatory
          />

          <TextInputField
            name="countryIso"
            value={roleProps.address?.countryIso}
            onChange={changeAddress}
            enabled={enabled}
          />

          <TextInputField
            name="primaryEmail"
            value={roleProps.primaryEmail}
            onChange={onChange}
            enabled={enabled}
            mandatory
          />

          <TextInputField
            name="secondaryEmail"
            value={roleProps.secondaryEmail}
            onChange={onChange}
            enabled={enabled}
          />

          <PhoneField
            name="primaryPhoneNumber"
            value={roleProps.primaryPhoneNumber}
            onChange={onChange}
            enabled={enabled}
            mandatory
          />

          <PhoneField
            name="secondaryPhoneNumber"
            value={roleProps.secondaryPhoneNumber}
            onChange={onChange}
            enabled={enabled}
          />

          <TextInputField name="skype" value={roleProps.skype} onChange={onChange} enabled={enabled} />

          <ContactMethodField
            name="contactPreference"
            value={roleProps.contactPreference}
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
