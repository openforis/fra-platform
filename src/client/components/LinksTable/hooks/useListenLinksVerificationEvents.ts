import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { Sockets } from 'meta/socket/sockets'
import { LinksVerificationEvent } from 'meta/socket/sockets/links'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { LinksActions } from 'client/store/links/actions'
import { useIsVerificationInProgress } from 'client/store/links/hooks/verification'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import {
  useTablePaginatedData,
  useTablePaginatedFilters,
  useTablePaginatedOrderBy,
  useTablePaginatedPage,
} from 'client/store/tablePaginated/hooks/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

type Props = {
  countryIso?: CountryIso
  path: string
}

export const useListenLinksVerificationEvents = (props: Props): void => {
  const { countryIso, path } = props
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useSectionRouteParams()

  const linksVerificationEvent = Sockets.getLinksVerificationEvent({ assessmentName, countryIso, cycleName })

  const page = useTablePaginatedPage(path)
  const orderBy = useTablePaginatedOrderBy(path)
  const filters = useTablePaginatedFilters(path)

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName, countryIso)
  const linksTableData = useTablePaginatedData({ path })

  useEffect(() => {
    const listener = (args: [{ event: LinksVerificationEvent }]): void => {
      const [{ event }] = args
      if (event === LinksVerificationEvent.queued || event === LinksVerificationEvent.active) {
        dispatch(
          LinksActions.setIsVerificationInProgress({
            assessmentName,
            countryIso,
            cycleName,
            isVerificationInProgress: true,
          })
        )
      } else if (event === LinksVerificationEvent.completed || event === LinksVerificationEvent.failed) {
        dispatch(
          LinksActions.setIsVerificationInProgress({
            assessmentName,
            countryIso,
            cycleName,
            isVerificationInProgress: false,
          })
        )
        dispatch(LinksActions.getVerificationSummary({ assessmentName, cycleName, countryIso }))
        const getDataProps = { assessmentName, countryIso, cycleName, filters, limit: 30, orderBy, page, path }
        dispatch(TablePaginatedActions.getData(getDataProps))
        dispatch(TablePaginatedActions.getCount(getDataProps))
      }
    }

    SocketClient.on(linksVerificationEvent, listener)
    return (): void => {
      SocketClient.off(linksVerificationEvent, listener)
    }
  }, [assessmentName, countryIso, cycleName, dispatch, filters, linksVerificationEvent, orderBy, page, path])

  useEffect(() => {
    if (verifyLinksInProgress && !Objects.isEmpty(linksTableData)) {
      dispatch(TablePaginatedActions.resetData({ path }))
    }
  }, [dispatch, linksTableData, path, verifyLinksInProgress])
}
