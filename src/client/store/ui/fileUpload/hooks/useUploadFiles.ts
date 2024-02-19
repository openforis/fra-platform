import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { File as FileType } from 'meta/file'

import { useAppDispatch } from 'client/store'
import { FileUploadActions } from 'client/store/ui/fileUpload/actions'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  onSuccess?: (files: Array<FileType>) => void
}

export const useUploadFiles = (props: Props): ((files: Array<File>) => void) => {
  const { onSuccess } = props
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(
    async (files: Array<File>) => {
      dispatch(FileUploadActions.uploadFiles({ assessmentName, cycleName, countryIso, files }))
        .unwrap()
        .then((files) => {
          if (onSuccess) {
            onSuccess(files)
          }
        })
    },
    [assessmentName, countryIso, cycleName, dispatch, onSuccess]
  )
}
