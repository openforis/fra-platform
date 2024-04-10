import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { HistoryTarget } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { usePath } from 'client/components/Navigation/NavAssessment/History/hooks/usePath'

export const useGetData = (target: HistoryTarget): void => {
  const path = usePath(target)
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()

  useEffect(() => {
    const params = { assessmentName, cycleName, countryIso, sectionName, path, page: 0, limit: 20 }
    dispatch(TablePaginatedActions.getData(params))
  }, [assessmentName, countryIso, cycleName, dispatch, path, sectionName])
}
