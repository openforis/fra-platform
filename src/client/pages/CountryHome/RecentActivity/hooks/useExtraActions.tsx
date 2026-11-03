import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { Users } from 'meta/user/users'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import {
  useTablePaginatedFilters,
  useTablePaginatedOrderBy,
  useTablePaginatedPage,
} from 'client/store/tablePaginated/hooks/tablePaginated'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useRefreshActivities } from 'client/hooks/useRefreshActivities'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { IconName } from 'client/components/Icon/types'

import { limit } from '../limit'

const path = ApiEndPoint.CycleData.activities()

export const useExtraActions = (): Array<React.ReactElement> => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const filters = useTablePaginatedFilters(path)
  const orderBy = useTablePaginatedOrderBy(path)
  const page = useTablePaginatedPage(path)
  const { isRefreshing, refreshActivities } = useRefreshActivities()
  const { t } = useTranslation()
  const user = useUser()

  const onRefresh = useCallback(async () => {
    await refreshActivities({ countryIso })
    const baseProps = { assessmentName, countryIso, cycleName, filters, path }
    dispatch(TablePaginatedActions.getCount(baseProps))
    dispatch(TablePaginatedActions.getData({ ...baseProps, limit, orderBy, page }))
  }, [assessmentName, countryIso, cycleName, dispatch, filters, orderBy, page, refreshActivities])

  return useMemo<Array<React.ReactElement>>(() => {
    // Hide refresh button for non admin users
    if (!Users.isAdministrator(user)) return []

    return [
      <Button
        key="refresh-activities"
        className="recent-activity-refresh"
        disabled={isRefreshing}
        iconName={IconName.refresh}
        label={t('landing.recentActivity.refresh')}
        onClick={onRefresh}
        size={ButtonSize.m}
      />,
    ]
  }, [isRefreshing, onRefresh, t, user])
}
