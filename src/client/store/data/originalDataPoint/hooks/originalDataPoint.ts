import { CountryIso } from 'meta/area/countryIso'
import { ODPReservedYear, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'
import { Arrays } from 'utils/arrays'
import { Dates } from 'utils/dates'

import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

import { OriginalDataPointSelectors } from '../selectors'

interface ReservedYear {
  year: number
}

export const useOriginalDataPoint = (): OriginalDataPoint => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const originalDataPoint = useAppSelector(OriginalDataPointSelectors.getOriginalDataPoint)

  const originalDataPointTemplate: Partial<OriginalDataPoint> = {
    comments: { [TableNames.extentOfForest]: '', [TableNames.forestCharacteristics]: '' },
    countryIso,
    nationalClasses: [],
    values: {},
    year: -1,
  }

  return originalDataPoint ?? originalDataPointTemplate
}

export const useIsOriginalDataPointUpdating = (): boolean =>
  useAppSelector(OriginalDataPointSelectors.isOriginalDataPointUpdating)

export const useOriginalDataPointReservedYears = (): Array<ODPReservedYear> =>
  useAppSelector(OriginalDataPointSelectors.getOriginalDataPointReservedYears)

export const useODPYears = (): { years: Array<number>; reservedYears: Array<number> } => {
  const reservedYears = useOriginalDataPointReservedYears() ?? []

  return {
    years: Arrays.reverse(Arrays.range(1950, Dates.getCurrentYear())),
    reservedYears: reservedYears.map((reservedYear: ReservedYear) => reservedYear.year),
  }
}
