import React, { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { ExplorerFilterActions } from 'client/store/explorer/filter/actions'
import { useExplorerCountries } from 'client/store/explorer/filter/hooks/useExplorerCountries'
import { useHomeCountriesFilter } from 'client/store/ui/home'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import CountryMultiSelect from 'client/components/CountryMultiSelect'

const Country: React.FC = () => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const dispatch = useAppDispatch()
  const allowedCountries = useHomeCountriesFilter()

  const explorerCountries = useExplorerCountries()

  useEffect(() => {
    dispatch(ExplorerFilterActions.setCountries({ assessmentName, countries: [], cycleName }))
  }, [allowedCountries, assessmentName, cycleName, dispatch])

  const handleChange = (value: Array<CountryIso>) => {
    dispatch(ExplorerFilterActions.setCountries({ assessmentName, countries: value, cycleName }))
  }

  return <CountryMultiSelect allowedCountries={allowedCountries} onChange={handleChange} value={explorerCountries} />
}

export default Country
