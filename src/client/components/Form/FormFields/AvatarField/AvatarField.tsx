import './AvatarField.scss'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'
import { useOnChange } from './hooks/useOnChange'

const AvatarField = (props: FieldProps) => {
  const { t } = useTranslation()
  const { fieldDefinition, register, setValue, watch } = props
  const { name } = fieldDefinition

  const profilePictureRef = useRef<HTMLImageElement>(null)
  const profilePictureInputRef = useRef<HTMLInputElement>(null)

  const userId = watch('userId') as number
  const onChange = useOnChange({ name, setValue, profilePictureRef })
  const onClick = () => profilePictureInputRef?.current?.click()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField fullWidth noBorder {...props}>
      <div className="form-field-avatar">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          type="file"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(name, { onChange })}
          ref={(e) => {
            profilePictureInputRef.current = e
          }}
        />
        <img ref={profilePictureRef} alt="" className="form-field-avatar-img" src={Users.profilePictureUri(userId)} />
        <Button label={t('editUser.chooseProfilePicture')} onClick={onClick} size={ButtonSize.xs} />
      </div>
    </FormField>
  )
}

export default AvatarField
