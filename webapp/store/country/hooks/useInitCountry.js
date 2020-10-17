import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { matchPath, useLocation, useParams } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'
import { fetchCountryInitialData } from '@webapp/app/country/actions'

export const useInitCountry = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { countryIso } = useParams()
  const printView = !!matchPath(pathname, { path: BasePaths.assessmentPrint })
  const printOnlyTablesView = !!matchPath(pathname, { path: BasePaths.assessmentPrintOnlyTables, exact: true })

  useEffect(() => {
    if (countryIso) dispatch(fetchCountryInitialData(countryIso, printView, printOnlyTablesView))
  }, [countryIso])

  return countryIso
}
