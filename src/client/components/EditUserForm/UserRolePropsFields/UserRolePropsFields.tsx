import React from 'react'

import { UserRoleExtendedProps } from '@meta/user/userRole'

import TextInputField from '../TextInputField'

type Props = {
  role: UserRoleExtendedProps
  onChange: (name: string, value: any) => void
  enabled?: boolean
}

const UserRolePropsFields: React.FC<Props> = (props) => {
  const { role, onChange, enabled } = props

  const changeAddress = (name: string, value: string) => onChange('address', { ...role.address, [name]: value })

  const changeContactPreference = (name: string, value: string) =>
    onChange('contactPreference', { ...role.contactPreference, [name]: value })

  return (
    <>
      <TextInputField name="organizationalUnit" value={role.organizationalUnit} onChange={onChange} enabled={enabled} />

      <TextInputField name="organization" value={role.organization} onChange={onChange} enabled={enabled} />

      <TextInputField name="street" value={role.address.street} onChange={changeAddress} enabled={enabled} />

      <TextInputField name="zipCode" value={role.address.zipCode} onChange={changeAddress} enabled={enabled} />

      <TextInputField name="poBox" value={role.address.poBox} onChange={changeAddress} enabled={enabled} />

      <TextInputField name="city" value={role.address.city} onChange={changeAddress} enabled={enabled} />

      <TextInputField name="countryIso" value={role.address.countryIso} onChange={changeAddress} enabled={enabled} />

      <TextInputField name="primaryEmail" value={role.primaryEmail} onChange={onChange} enabled={enabled} />

      <TextInputField name="secondaryEmail" value={role.secondaryEmail} onChange={onChange} enabled={enabled} />

      <TextInputField name="primaryPhoneNumber" value={role.primaryPhoneNumber} onChange={onChange} enabled={enabled} />

      <TextInputField
        name="secondaryPhoneNumber"
        value={role.secondaryPhoneNumber}
        onChange={onChange}
        enabled={enabled}
      />

      <TextInputField name="skype" value={role.skype} onChange={onChange} enabled={enabled} />

      <TextInputField
        name="contactPreference"
        value={role.contactPreference?.method}
        onChange={changeContactPreference}
        enabled={enabled}
      />
    </>
  )
}

UserRolePropsFields.defaultProps = {
  enabled: false,
}

export default UserRolePropsFields
