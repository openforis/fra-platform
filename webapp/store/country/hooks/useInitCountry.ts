import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { matchPath, useLocation, useParams } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'
import { fetchCountryInitialData } from '@webapp/app/country/actions'

export const useInitCountry = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assessmentType' does not exist on type '... Remove this comment to see the full error message
  const { assessmentType, countryIso } = useParams()
  const printView = !!matchPath(pathname, { path: BasePaths.assessmentPrint })
  const printOnlyTablesView = !!matchPath(pathname, { path: BasePaths.assessmentPrintOnlyTables, exact: true })

  useEffect(() => {
    if (countryIso) {
      dispatch(fetchCountryInitialData(countryIso, assessmentType, printView, printOnlyTablesView))
    }
  }, [countryIso])
}
