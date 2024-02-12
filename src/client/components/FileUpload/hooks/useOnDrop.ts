import { useCallback, useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { useUploadedFiles } from 'client/store/ui/fileUpload'
import { FileUploadActions } from 'client/store/ui/fileUpload/actions'
import { useRepositoryItem } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useOnChange } from 'client/pages/CountryHome/Repository/Panel/hooks/useOnChange'

export const useOnDrop = (): ((files: Array<File>) => void) => {
  const dispatch = useAppDispatch()
  const { onChangeField } = useOnChange()

  const repositoryItem = useRepositoryItem()
  const files = useUploadedFiles()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  useEffect(() => {
    const hasFiles = files?.length > 0
    if (!hasFiles) return

    const file = files[0]
    if (file.uuid !== repositoryItem?.fileUuid) {
      onChangeField('fileUuid', files[0].uuid)
    }
  }, [files, onChangeField, repositoryItem?.fileUuid])

  return useCallback(
    async (files: Array<File>) => {
      dispatch(FileUploadActions.uploadFiles({ assessmentName, cycleName, countryIso, files }))
    },
    [assessmentName, countryIso, cycleName, dispatch]
  )
}
