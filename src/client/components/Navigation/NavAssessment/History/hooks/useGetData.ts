import { useEffect } from 'react'

import { HistoryItemSectionKey } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { usePath } from 'client/components/Navigation/NavAssessment/History/hooks/usePath'

export const useGetData = (sectionKey: HistoryItemSectionKey): void => {
  const path = usePath(sectionKey)
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  useEffect(() => {
    const params = { assessmentName, cycleName, countryIso, path, page: 0, limit: 20 }
    dispatch(TablePaginatedActions.getData(params))
  }, [assessmentName, countryIso, cycleName, dispatch, path])
}
