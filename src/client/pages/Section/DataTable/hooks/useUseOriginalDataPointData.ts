import { useMemo } from 'react'

import { Table, TableNames } from 'meta/assessment'

import { useCountry } from 'client/store/area'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { useCountryIso } from 'client/hooks'

type Props = {
  table: Table
}

export const useUseOriginalDataPointData = (props: Props): boolean => {
  const { table } = props

  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const showOriginalDataPoints = useShowOriginalDatapoints()
  const tableName = table.props.name
  const { useOriginalDataPoint } = country.props.forestCharacteristics

  return useMemo<boolean>(() => {
    if (tableName === TableNames.extentOfForest) return showOriginalDataPoints
    if (tableName === TableNames.forestCharacteristics) return useOriginalDataPoint
    return true
  }, [useOriginalDataPoint, showOriginalDataPoints, tableName])
}
