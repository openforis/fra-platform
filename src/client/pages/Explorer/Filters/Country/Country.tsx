import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CountryIso } from 'meta/area'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useExplorerCountries } from 'client/store/explorer/selection/hooks/countries'
import { useAppDispatch } from 'client/store/hooks'
import { useGlobalCountries } from 'client/store/ui/countryReport/hooks/globalCountries'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import CountryMultiSelect from 'client/components/CountryMultiSelect'

const Country: React.FC = () => {
  const { state } = useLocation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const dispatch = useAppDispatch()
  const homeCountriesFilter = useGlobalCountries()
  const allowedCountries = homeCountriesFilter?.length > 0 ? homeCountriesFilter : undefined

  const explorerCountries = useExplorerCountries()

  useEffect(() => {
    // Pick countries from redirect or default to empty array
    const countries = state?.countryISOs || []
    dispatch(ExplorerSelectionActions.setCountries({ assessmentName, countries, cycleName }))
  }, [assessmentName, cycleName, dispatch, homeCountriesFilter, state?.countryISOs])

  const handleChange = (value: Array<CountryIso>): void => {
    dispatch(ExplorerSelectionActions.setCountries({ assessmentName, countries: value, cycleName }))
  }

  return <CountryMultiSelect allowedCountries={allowedCountries} onChange={handleChange} value={explorerCountries} />
}

export default Country
