import React, { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useExplorerCountries } from 'client/store/explorer/selection/hooks/countries'
import { useAppDispatch } from 'client/store/hooks'
import { useGlobalCountries } from 'client/store/ui/countryReport/hooks/globalCountries'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import CountryMultiSelect from 'client/components/CountryMultiSelect'

const Country: React.FC = () => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const dispatch = useAppDispatch()
  const homeCountriesFilter = useGlobalCountries()
  const allowedCountries = homeCountriesFilter?.length > 0 ? homeCountriesFilter : undefined

  const explorerCountries = useExplorerCountries()

  useEffect(() => {
    dispatch(ExplorerSelectionActions.setCountries({ assessmentName, countries: [], cycleName }))
  }, [assessmentName, cycleName, dispatch, homeCountriesFilter])

  const handleChange = (value: Array<CountryIso>) => {
    dispatch(ExplorerSelectionActions.setCountries({ assessmentName, countries: value, cycleName }))
  }

  return <CountryMultiSelect allowedCountries={allowedCountries} onChange={handleChange} value={explorerCountries} />
}

export default Country
