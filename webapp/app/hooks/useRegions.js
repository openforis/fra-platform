import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useI18n } from '@webapp/components/hooks'
import * as AppState from '@webapp/app/appState'

const useRegions = () => {
  const i18n = useI18n()
  const regions = useSelector(AppState.getRegions)
  const [regionsSorted, setRegionsSorted] = useState([])
  const _getListname = (regionCode) => i18n.t(`area.${regionCode}.listName`)

  useEffect(() => {
    if (regions) {
      setRegionsSorted(regions.sort((region1, region2) => (_getListname(region1) > _getListname(region2) ? 1 : -1)))
    }
  }, [i18n.language, regions])
  return regionsSorted
}

export default useRegions
