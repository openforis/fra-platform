import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useClosePanel } from 'client/pages/CountryHome/Repository/hooks/useClosePanel'

type Returned = () => void

export const useOnDelete = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()

  const closePanel = useClosePanel()

  return useCallback<Returned>(() => {
    const params = { assessmentName, cycleName, countryIso, sectionName }
    dispatch(RepositoryActions.removeRepositoryItem(params))
      .unwrap()
      .then(() => {
        closePanel()
      })
  }, [assessmentName, cycleName, countryIso, sectionName, dispatch, closePanel])
}
