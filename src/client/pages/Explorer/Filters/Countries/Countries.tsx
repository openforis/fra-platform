import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CountryIso } from 'meta/area/countryIso'
import { Users } from 'meta/user'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useExplorerCountries } from 'client/store/explorer/selection/hooks/countries'
import { useAppDispatch } from 'client/store/hooks'
import { useGlobalCountries } from 'client/store/ui/countryReport/hooks/globalCountries'
import { useUser } from 'client/store/user/hooks/user'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import CountryMultiSelect from 'client/components/CountryMultiSelect'

import { useAllowedCountries } from './hooks/useAllowedCountries'

const Countries: React.FC = () => {
  const { state } = useLocation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const dispatch = useAppDispatch()
  const homeCountriesFilter = useGlobalCountries()
  const explorerCountries = useExplorerCountries()
  const allowedCountries = useAllowedCountries()
  const user = useUser()

  const administrator = Users.isAdministrator(user)

  useEffect(() => {
    // Pick countries from redirect or default to empty array
    const countries = state?.countryISOs || []
    dispatch(ExplorerSelectionActions.setCountries({ assessmentName, countries, cycleName }))
  }, [assessmentName, cycleName, dispatch, homeCountriesFilter, state?.countryISOs])

  const handleChange = (value: Array<CountryIso>): void => {
    dispatch(ExplorerSelectionActions.setCountries({ assessmentName, countries: value, cycleName }))
  }

  return (
    <CountryMultiSelect
      allowAtlantis={administrator}
      allowedCountries={allowedCountries}
      onChange={handleChange}
      value={explorerCountries}
    />
  )
}

export default Countries
