import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Area } from '@common/country'
import * as AppState from '@webapp/app/appState'
import { useI18n, useOnUpdate } from '@webapp/components/hooks'

const sortRegions = (regionsToSort, i18n) => {
  const compareListName = Area.getCompareListName(i18n)
  return regionsToSort.sort(compareListName)
}

const useRegions = () => {
  const i18n = useI18n()
  const regions = useSelector(AppState.getRegions)

  const [regionsSorted, setRegionsSorted] = useState(() => sortRegions(regions, i18n))

  useOnUpdate(() => {
    setRegionsSorted([...sortRegions(regions, i18n)])
  }, [regions, i18n])

  return regionsSorted
}

export default useRegions
