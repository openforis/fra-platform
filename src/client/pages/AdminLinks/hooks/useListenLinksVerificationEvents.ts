import { useEffect } from 'react'

import { WorkerListener } from 'bullmq'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Sockets } from 'meta/socket'

import { useAppDispatch } from 'client/store'
import { LinksActions, useIsVerificationInProgress } from 'client/store/ui/links'
import {
  TablePaginatedActions,
  useTablePaginatedData,
  useTablePaginatedOrderBy,
  useTablePaginatedPage,
} from 'client/store/ui/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { SocketClient } from 'client/service/socket'

export const useListenLinksVerificationEvents = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useSectionRouteParams()

  const linksVerificationEvent = Sockets.getLinksVerificationEvent({ assessmentName, cycleName })

  const path = ApiEndPoint.CycleData.Links.many()
  const page = useTablePaginatedPage(path)
  const orderBy = useTablePaginatedOrderBy(path)

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName)
  const linksTableData = useTablePaginatedData(path)

  useEffect(() => {
    const listener = (args: [{ event: keyof WorkerListener }]): void => {
      const [{ event }] = args
      if (event === 'active') {
        dispatch(
          LinksActions.setIsVerificationInProgress({ assessmentName, cycleName, isVerificationInProgress: true })
        )
      } else if (event === 'completed' || event === 'failed') {
        dispatch(
          LinksActions.setIsVerificationInProgress({ assessmentName, cycleName, isVerificationInProgress: false })
        )
        const getDataProps = { assessmentName, cycleName, limit: 30, orderBy, page, path }
        dispatch(TablePaginatedActions.getData(getDataProps))
        dispatch(TablePaginatedActions.getCount(getDataProps))
      }
    }

    SocketClient.on(linksVerificationEvent, listener)
    return () => {
      SocketClient.off(linksVerificationEvent, listener)
    }
  }, [assessmentName, cycleName, dispatch, linksVerificationEvent, orderBy, page, path])

  useEffect(() => {
    if (verifyLinksInProgress && !Objects.isEmpty(linksTableData)) {
      dispatch(TablePaginatedActions.resetPaths({ paths: [path] }))
    }
  }, [dispatch, linksTableData, path, verifyLinksInProgress])
}
