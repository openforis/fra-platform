import './AvatarField.scss'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'

const AvatarField = (props: FieldProps) => {
  const { t } = useTranslation()
  const { fieldDefinition, register, setValue, watch } = props
  const { name } = fieldDefinition

  const profilePicture = useRef(null)
  const profilePictureFile = useRef<HTMLInputElement>(null)

  const userId = watch('userId') as number

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0]
    const pictureRef = profilePicture?.current

    setValue(name, currentFile)

    if (currentFile && pictureRef) {
      const reader = new FileReader()
      reader.onload = (event) => {
        pictureRef.src = event.target?.result as string
      }
      reader.readAsDataURL(currentFile)
    }
  }

  const onClick = () => {
    profilePictureFile?.current?.click()
  }

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
            profilePictureFile.current = e
          }}
        />
        <img ref={profilePicture} alt="" className="form-field-avatar-img" src={Users.profilePictureUri(userId)} />
        <Button label={t('editUser.chooseProfilePicture')} onClick={onClick} size={ButtonSize.xs} />
      </div>
    </FormField>
  )
}

export default AvatarField
