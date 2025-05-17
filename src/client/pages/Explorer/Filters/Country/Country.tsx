import React from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { ExplorerFilterActions } from 'client/store/explorer/filter/actions'
import { useExplorerCountries } from 'client/store/explorer/filter/hooks/useExplorerCountries'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import CountryMultiSelect from 'client/components/CountryMultiSelect'

const Country: React.FC = () => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const dispatch = useAppDispatch()

  const explorerCountries = useExplorerCountries(assessmentName, cycleName)

  const handleChange = (value: Array<CountryIso>) => {
    dispatch(ExplorerFilterActions.setCountries({ assessmentName, countries: value, cycleName }))
  }

  return <CountryMultiSelect onChange={handleChange} value={explorerCountries} />
}

export default Country
