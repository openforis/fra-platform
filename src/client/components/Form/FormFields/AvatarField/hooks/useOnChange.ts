import { ChangeEvent, RefObject, useCallback } from 'react'
import { UseFormSetValue } from 'react-hook-form'

type Returned = (e: ChangeEvent<HTMLInputElement>) => void

type Props = {
  name: string
  setValue: UseFormSetValue<any>
  profilePictureRef: RefObject<HTMLImageElement>
}

export const useOnChange = (props: Props): Returned => {
  const { name, profilePictureRef, setValue } = props

  return useCallback<Returned>(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentFile = e.target.files?.[0]
      const pictureRef = profilePictureRef?.current

      setValue(name, currentFile, { shouldDirty: true })

      if (currentFile && pictureRef) {
        const reader = new FileReader()
        reader.onload = (event) => {
          pictureRef.src = event.target?.result as string
        }
        reader.readAsDataURL(currentFile)
      }
    },
    [name, profilePictureRef, setValue]
  )
}
