import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'
import { useRepositoryItem } from 'client/store/repository/hooks/repository'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { useClosePanel } from 'client/pages/CountryHome/Repository/hooks/useClosePanel'

type Returned = () => void

export const useOnDelete = (): Returned => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const repositoryItem = useRepositoryItem()

  const closePanel = useClosePanel()

  return useCallback<Returned>(() => {
    const confirmed = window.confirm(t('common.areYouSureYouWantToDelete'))
    if (!confirmed) return

    const params = { assessmentName, cycleName, countryIso, sectionName, repositoryItem }
    dispatch(RepositoryActions.removeRepositoryItem(params))
      .unwrap()
      .then(() => {
        closePanel()
      })
  }, [assessmentName, closePanel, countryIso, cycleName, dispatch, repositoryItem, sectionName, t])
}
