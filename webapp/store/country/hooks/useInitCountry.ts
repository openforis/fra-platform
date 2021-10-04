import { useEffect } from 'react'
import { matchPath, useLocation, useParams } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'
import { useAppDispatch } from '@webapp/store'
import { CountryActions } from '@webapp/store/country'

export const useInitCountry = (): void => {
  const dispatch = useAppDispatch()

  const { pathname } = useLocation()
  const { assessmentType, countryIso }: Record<string, string | undefined> = useParams()
  const printView = !!matchPath(pathname, { path: BasePaths.assessmentPrint })
  const printOnlyTablesView = !!matchPath(pathname, { path: BasePaths.assessmentPrintOnlyTables, exact: true })

  useEffect(() => {
    if (countryIso) {
      dispatch(CountryActions.initCountry({ countryIso, assessmentType, printView, printOnlyTablesView }))
    }
  }, [countryIso])
}
