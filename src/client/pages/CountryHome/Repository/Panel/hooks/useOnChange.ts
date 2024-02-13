import { useCallback, useEffect } from 'react'

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
      dispatch(RepositoryActions.setRepositoryItemProps({ [name]: value }))
    },
    [dispatch]
  )

  // update repositoryItem.props
  const onChangeProps = useCallback<OnChange>(
    (name: string, value: string) => {
      const props = { ...(repositoryItem.props ?? {}), [name]: value }
      dispatch(RepositoryActions.setRepositoryItemProps({ props }))
    },
    [dispatch, repositoryItem]
  )

  useEffect(() => {
    if (!files || files.length <= 0) return

    const file = files[0]
    const fileUuid = file.uuid
    if (fileUuid) {
      const name = file.name.split('.')[0]
      dispatch(RepositoryActions.setRepositoryItemProps({ fileUuid, name }))
    }
  }, [dispatch, files])

  return { onChangeField, onChangeProps }
}
