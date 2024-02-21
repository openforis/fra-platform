import { useCallback, useEffect } from 'react'

import { File } from 'meta/file'

import { useAppDispatch } from 'client/store'
import { useUploadedFiles } from 'client/store/ui/fileUpload'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'

type OnChange = (name: string, value: string | boolean) => void

type Returned = {
  onChangeField: OnChange
  onChangeProps: OnChange
  onChangeTranslation: OnChange
}

export const useOnChange = (): Returned => {
  const dispatch = useAppDispatch()
  const repositoryItem = useRepositoryItem()

  const files: Array<File> = useUploadedFiles()

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

  const onChangeTranslation = useCallback<OnChange>(
    (lang: string, value: string) => {
      const translation = { ...(repositoryItem.props?.translation ?? {}), [lang]: value }
      const props = { ...repositoryItem.props, translation }
      dispatch(RepositoryActions.setRepositoryItemProps({ props }))
    },
    [dispatch, repositoryItem]
  )

  useEffect(() => {
    if (!files || files.length <= 0) return

    const file: File = files[0]
    const fileUuid = file.uuid
    if (fileUuid && repositoryItem?.fileUuid !== fileUuid) {
      const name = file.name.split('.').slice(0, -1).join('.')
      const translation = { ...(repositoryItem?.props?.translation ?? {}), en: name }
      dispatch(RepositoryActions.setRepositoryItemProps({ fileUuid, props: { ...repositoryItem?.props, translation } }))
      dispatch(RepositoryActions.setFile(file))
    }
  }, [dispatch, files, repositoryItem?.fileUuid, repositoryItem?.props])

  return {
    onChangeField,
    onChangeProps,
    onChangeTranslation,
  }
}
