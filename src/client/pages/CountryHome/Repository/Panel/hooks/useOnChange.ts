import { useCallback, useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'
import { useFileUploadContext } from 'client/components/FileUpload'

type Returned = (name: string, value: string) => void

export const useOnChange = (): Returned => {
  const dispatch = useAppDispatch()
  const repositoryItem = useRepositoryItem()

  const { files } = useFileUploadContext()

  const onChange = useCallback<Returned>(
    (name: string, value: string) => {
      dispatch(RepositoryActions.setRepositoryItem({ ...repositoryItem, [name]: value }))
    },
    [dispatch, repositoryItem]
  )

  // When a file is selected and the name is empty,
  // set the name to the file name
  useEffect(() => {
    if (files?.length > 0 && repositoryItem?.name === '') {
      const file = files[0]
      const name = file.name.split('.')[0]
      onChange('name', name)
    }
  }, [files, onChange, repositoryItem?.name])

  return onChange
}
