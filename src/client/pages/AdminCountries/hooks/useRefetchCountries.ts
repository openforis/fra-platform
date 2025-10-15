import { useEffect } from 'react'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { usePrevious } from 'client/hooks'
import { useLanguage } from 'client/hooks/useLanguage'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  path: string
}

export const useRefetchCountries = (props: Props): void => {
  const { path } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const lang = useLanguage()

  const previousLang = usePrevious(lang, lang)

  useEffect(() => {
    if (previousLang === lang) return

    const params = { assessmentName, cycleName, lang, limit: 30, path }
    dispatch(TablePaginatedActions.refetchData(params))
  }, [assessmentName, cycleName, dispatch, lang, path, previousLang])
}
