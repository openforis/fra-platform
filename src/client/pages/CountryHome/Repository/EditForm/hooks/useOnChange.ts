import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
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

  return {
    onChangeField,
    onChangeProps,
    onChangeTranslation,
  }
}
