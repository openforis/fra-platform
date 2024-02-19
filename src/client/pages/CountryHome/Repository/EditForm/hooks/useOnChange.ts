import { useCallback, useEffect } from 'react'

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

  const onChangeTranslation = useCallback<OnChange>(
    (lang: string, value: string) => {
      const translations = { ...(repositoryItem.props?.translations ?? {}), [lang]: value }
      const props = { ...repositoryItem.props, translations }
      dispatch(RepositoryActions.setRepositoryItemProps({ props }))
    },
    [dispatch, repositoryItem]
  )

  useEffect(() => {
    if (!files || files.length <= 0) return

    const file = files[0]
    const fileUuid = file.uuid
    if (fileUuid && repositoryItem?.fileUuid !== fileUuid) {
      const name = file.name.split('.')[0]
      const translations = { ...(repositoryItem?.props?.translations ?? {}), en: name }
      dispatch(
        RepositoryActions.setRepositoryItemProps({ fileUuid, props: { ...repositoryItem?.props, translations } })
      )
    }
  }, [dispatch, files, repositoryItem?.fileUuid, repositoryItem?.props])

  return {
    onChangeField,
    onChangeProps,
    onChangeTranslation,
  }
}
