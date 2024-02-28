import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useClosePanel } from 'client/pages/CountryHome/Repository/hooks/useClosePanel'

type Returned = () => void

export const useOnDelete = (): Returned => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const repositoryItem = useRepositoryItem()

  const closePanel = useClosePanel()

  return useCallback<Returned>(() => {
    const confirmed = window.confirm(t('common.areYouSure'))
    if (!confirmed) return

    const params = { assessmentName, cycleName, countryIso, sectionName, repositoryItem }
    dispatch(RepositoryActions.removeRepositoryItem(params))
      .unwrap()
      .then(() => {
        closePanel()
      })
  }, [t, assessmentName, cycleName, countryIso, sectionName, repositoryItem, dispatch, closePanel])
}
