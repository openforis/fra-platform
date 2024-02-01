import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useSelectedFileContext } from 'client/context/selectedFilesContext'

type Returned = () => void

export const useUpsertRepositoryItem = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { selectedFiles, setSelectedFiles } = useSelectedFileContext()

  return useCallback<Returned>(async () => {
    const saveParams = { assessmentName, cycleName, countryIso, file: selectedFiles?.[0] }
    dispatch(RepositoryActions.upsertRepositoryItem(saveParams))
      .unwrap()
      .then(() => {
        setSelectedFiles(null)
      })
  }, [assessmentName, cycleName, countryIso, selectedFiles, dispatch, setSelectedFiles])
}
