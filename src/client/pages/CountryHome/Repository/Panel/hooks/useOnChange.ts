import { useCallback, useEffect } from 'react'

import { Objects } from 'utils/objects'

import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { useUploadedFiles } from 'client/store/ui/fileUpload'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'

type OnChange = (name: string, value: string | boolean) => void

type Returned = {
  onChangeField: OnChange
  onChangeProps: OnChange
}

export const useOnChange = (): Returned => {
  const dispatch = useAppDispatch()
  const repositoryItem = useRepositoryItem()

  const files = useUploadedFiles()

  const onChangeField = useCallback<OnChange>(
    (name: string, value: string) => {
      dispatch(RepositoryActions.setRepositoryItemProp({ key: name as keyof RepositoryItem, value }))
    },
    [dispatch]
  )

  // update repositoryItem.props
  const onChangeProps = useCallback<OnChange>(
    (name: string, value: string) => {
      const props = { ...(repositoryItem.props ?? {}), [name]: value }
      dispatch(RepositoryActions.setRepositoryItemProp({ key: 'props', value: props }))
    },
    [dispatch, repositoryItem]
  )

  useEffect(() => {
    if (!files || files.length <= 0) return

    const file = files[0]
    const fileUuid = file.uuid
    if (!Objects.isEmpty(repositoryItem) && fileUuid !== repositoryItem?.fileUuid) {
      const name = file.name.split('.')[0]
      dispatch(RepositoryActions.setRepositoryItemProp({ key: 'fileUuid', value: fileUuid }))
      dispatch(RepositoryActions.setRepositoryItemProp({ key: 'name', value: name }))
    }
  }, [dispatch, files, repositoryItem, repositoryItem?.fileUuid])

  return { onChangeField, onChangeProps }
}
