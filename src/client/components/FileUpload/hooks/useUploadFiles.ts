import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { FileUploadActions } from 'client/store/ui/fileUpload'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { FileUploadProps } from 'client/components/FileUpload/types'

type Returned = (files: Array<File>) => void

export const useUploadFiles = (props: Pick<FileUploadProps, 'onChange'>): Returned => {
  const { onChange } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<Returned>(
    async (files: Array<File>) => {
      const uploadFiles = FileUploadActions.uploadFiles({ assessmentName, cycleName, countryIso, files })
      const uploadedFiles = await dispatch(uploadFiles).unwrap()

      onChange(uploadedFiles)
    },
    [assessmentName, countryIso, cycleName, dispatch, onChange]
  )
}
