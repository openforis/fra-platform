import { useMemo } from 'react'

import { useOriginalDataPointReservedYears } from 'client/store/ui/originalDataPoint'

export const useReservedYearsWithClasses = (year: number) => {
  const reservedYears = useOriginalDataPointReservedYears()
  return useMemo(() => {
    return (reservedYears ?? []).reduce<Array<number>>((acc, reservedYear) => {
      if (Number(reservedYear.year) !== Number(year) && reservedYear.nationalClasses > 0) {
        acc.push(reservedYear.year)
      }
      return acc
    }, [])
  }, [reservedYears, year])
}
