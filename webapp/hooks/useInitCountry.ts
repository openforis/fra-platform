import { useEffect } from 'react'
import { matchPath, useLocation, useParams } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'
import { fetchCountryInitialData } from '@webapp/app/country/actions'
import { useDispatch } from 'react-redux'

export default (): void => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { assessmentType, countryIso }: Record<string, string | undefined> = useParams()
  const printView = !!matchPath(pathname, { path: BasePaths.assessmentPrint })
  const printOnlyTablesView = !!matchPath(pathname, { path: BasePaths.assessmentPrintOnlyTables, exact: true })

  useEffect(() => {
    if (countryIso) {
      dispatch(fetchCountryInitialData(countryIso, assessmentType, printView, printOnlyTablesView))
    }
  }, [countryIso])
}
