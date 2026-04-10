import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { useClosePanel } from 'client/pages/CountryHome/Repository/hooks/useClosePanel'

export const useOnDelete = (repositoryItem: Partial<RepositoryItem> | undefined): (() => void) => {
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const closePanel = useClosePanel()
  const { t } = useTranslation()

  const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=false`
  const limit: number = undefined
  const page: number = undefined

  return useCallback(async (): Promise<void> => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(t('common.areYouSureYouWantToDelete'))) return

    const url = ApiEndPoint.CycleData.Repository.one()
    const params = { assessmentName, countryIso, cycleName, sectionName, uuid: repositoryItem?.uuid }
    await axios.delete(url, { params })
    await dispatch(TablePaginatedActions.getData({ assessmentName, countryIso, cycleName, limit, page, path })).unwrap()
    closePanel()
  }, [
    assessmentName,
    closePanel,
    countryIso,
    cycleName,
    dispatch,
    limit,
    page,
    path,
    repositoryItem?.uuid,
    sectionName,
    t,
  ])
}
