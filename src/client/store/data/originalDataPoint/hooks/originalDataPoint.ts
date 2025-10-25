import { Arrays } from 'utils/arrays'
import { Dates } from 'utils/dates'

import { ODPReservedYear, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

import { OriginalDataPointSelectors } from '../selectors'

interface ReservedYear {
  year: number
}

export const useOriginalDataPoint = (): OriginalDataPoint => {
  const { countryIso } = useCountryRouteParams()
  const originalDataPoint = useAppSelector(OriginalDataPointSelectors.getOriginalDataPoint)
  const originalDataPointTemplate = {
    commentsExtentOfForest: '',
    commentsForestCharacteristics: '',
    countryIso,
    dataSourceAdditionalComments: '',
    dataSourceMethods: [],
    dataSourceReferences: '',
    nationalClasses: [],
    values: {},
    year: -1,
  } as OriginalDataPoint
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
