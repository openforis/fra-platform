import { useCallback, useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useRepositoryItem } from 'client/store/ui/repository/hooks'
import { useSelectedFileContext } from 'client/context/selectedFilesContext'

type Returned = (name: string, value: string) => void

export const useOnChange = (): Returned => {
  const dispatch = useAppDispatch()
  const repositoryItem = useRepositoryItem()

  const { selectedFiles } = useSelectedFileContext()

  const onChange = useCallback<Returned>(
    (name: string, value: string) => {
      dispatch(RepositoryActions.setRepositoryItem({ ...repositoryItem, [name]: value }))
    },
    [dispatch, repositoryItem]
  )

  // When a file is selected and the name is empty,
  // set the name to the file name
  useEffect(() => {
    if (selectedFiles?.length > 0 && repositoryItem?.name === '') {
      const file = selectedFiles[0]
      const name = file.name.split('.')[0]
      onChange('name', name)
    }
  }, [onChange, repositoryItem?.name, selectedFiles])

  return onChange
}
