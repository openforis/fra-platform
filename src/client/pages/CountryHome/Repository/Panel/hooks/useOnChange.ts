import { useCallback, useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'
import { useFileUploadContext } from 'client/components/FileUpload'

type OnChange = (name: string, value: string | boolean) => void

type Returned = {
  onChangeField: OnChange
  onChangeProps: OnChange
}

export const useOnChange = (): Returned => {
  const dispatch = useAppDispatch()
  const repositoryItem = useRepositoryItem()

  const { files } = useFileUploadContext()

  const onChangeField = useCallback<OnChange>(
    (name: string, value: string) => {
      dispatch(RepositoryActions.setRepositoryItem({ ...repositoryItem, [name]: value }))
    },
    [dispatch, repositoryItem]
  )
  // update repositoryItem.props
  const onChangeProps = useCallback<OnChange>(
    (name: string, value: string) => {
      const props = { ...(repositoryItem.props ?? {}), [name]: value }
      dispatch(RepositoryActions.setRepositoryItem({ ...repositoryItem, props }))
    },
    [dispatch, repositoryItem]
  )

  // When a file is selected and the name is empty,
  // set the name to the file name
  useEffect(() => {
    if (files?.length > 0 && repositoryItem?.name === '') {
      const file = files[0]
      const name = file.name.split('.')[0]
      onChangeField('name', name)
    }
  }, [files, onChangeField, repositoryItem?.name])

  return { onChangeField, onChangeProps }
}
