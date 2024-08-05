import React from 'react'

import { RoleName, UserContactPreference, UserRole } from 'meta/user/userRole'

import { useCanEditRoleProps } from 'client/hooks/useAuth'

import ContactMethodField from '../ContactMethodField'
import CountrySelectField from '../CountrySelectField'
import PhoneField from '../PhoneField'
import TextInputField from '../TextInputField'

type Props = {
  role: UserRole<any, any>
  onChange: (name: string, value: any) => void
  enabled?: boolean
}

const UserRolePropsFields: React.FC<Props> = (props) => {
  const { role, onChange, enabled: enabledProp } = props
  const { props: roleProps } = role

  const changeAddress = (name: string, value: string) => onChange('address', { ...roleProps.address, [name]: value })

  const changeContactPreference = (value: UserContactPreference) => onChange('contactPreference', value)

  const enabled = useCanEditRoleProps() && enabledProp

  return (
    <>
      <TextInputField
        enabled={enabled}
        name="professionalTitle"
        onChange={onChange}
        value={roleProps.professionalTitle}
      />

      <TextInputField
        enabled={enabled}
        name="organizationalUnit"
        onChange={onChange}
        value={roleProps.organizationalUnit}
      />

      <TextInputField
        editorLink
        enabled={enabled}
        mandatory
        name="organization"
        onChange={onChange}
        value={roleProps.organization}
      />

      {[RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR].includes(
        role.role
      ) && (
        <>
          <TextInputField
            enabled={enabled}
            mandatory
            name="street"
            onChange={changeAddress}
            value={roleProps.address?.street}
          />

          <TextInputField
            enabled={enabled}
            mandatory
            name="zipCode"
            onChange={changeAddress}
            value={roleProps.address?.zipCode}
          />

          <TextInputField enabled={enabled} name="poBox" onChange={changeAddress} value={roleProps.address?.poBox} />

          <TextInputField
            enabled={enabled}
            mandatory
            name="city"
            onChange={changeAddress}
            value={roleProps.address?.city}
          />

          <CountrySelectField
            enabled={enabled}
            name="countryIso"
            onChange={changeAddress}
            value={roleProps.address?.countryIso}
          />

          <TextInputField
            enabled={enabled}
            name="secondaryEmail"
            onChange={onChange}
            value={roleProps.secondaryEmail}
          />

          <PhoneField
            enabled={enabled}
            mandatory
            name="primaryPhoneNumber"
            onChange={onChange}
            value={roleProps.primaryPhoneNumber}
          />

          <PhoneField
            enabled={enabled}
            name="secondaryPhoneNumber"
            onChange={onChange}
            value={roleProps.secondaryPhoneNumber}
          />

          <TextInputField enabled={enabled} name="skype" onChange={onChange} value={roleProps.skype} />

          <ContactMethodField
            enabled={enabled}
            name="contactPreference"
            onChange={changeContactPreference}
            value={roleProps.contactPreference}
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
