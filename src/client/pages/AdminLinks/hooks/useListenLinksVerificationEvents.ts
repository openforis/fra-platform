import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Sockets } from 'meta/socket/sockets'
import { Objects } from 'utils/objects'

import { LinksActions } from 'client/store/admin/links/actions'
import { useIsVerificationInProgress } from 'client/store/admin/links/hooks/verification'
import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import {
  useTablePaginatedData,
  useTablePaginatedFilters,
  useTablePaginatedOrderBy,
  useTablePaginatedPage,
} from 'client/store/tablePaginated/hooks/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

export const useListenLinksVerificationEvents = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useSectionRouteParams()

  const linksVerificationEvent = Sockets.getLinksVerificationEvent({ assessmentName, cycleName })

  const path = ApiEndPoint.CycleData.Links.many()
  const page = useTablePaginatedPage(path)
  const orderBy = useTablePaginatedOrderBy(path)
  const filters = useTablePaginatedFilters(path)

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName)
  const linksTableData = useTablePaginatedData({ path })

  useEffect(() => {
    const listener = (args: [{ event: 'queued' | 'active' | 'completed' | 'failed' }]): void => {
      const [{ event }] = args
      if (event === 'queued' || event === 'active') {
        dispatch(
          LinksActions.setIsVerificationInProgress({ assessmentName, cycleName, isVerificationInProgress: true })
        )
      } else if (event === 'completed' || event === 'failed') {
        dispatch(
          LinksActions.setIsVerificationInProgress({ assessmentName, cycleName, isVerificationInProgress: false })
        )
        const getDataProps = { assessmentName, cycleName, filters, limit: 30, orderBy, page, path }
        dispatch(TablePaginatedActions.getData(getDataProps))
        dispatch(TablePaginatedActions.getCount(getDataProps))
      }
    }

    SocketClient.on(linksVerificationEvent, listener)
    return (): void => {
      SocketClient.off(linksVerificationEvent, listener)
    }
  }, [assessmentName, cycleName, dispatch, filters, linksVerificationEvent, orderBy, page, path])

  useEffect(() => {
    if (verifyLinksInProgress && !Objects.isEmpty(linksTableData)) {
      dispatch(TablePaginatedActions.resetData({ path }))
    }
  }, [dispatch, linksTableData, path, verifyLinksInProgress])
}
