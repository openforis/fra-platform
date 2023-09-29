import { Arrays } from 'utils/arrays'

import { CycleName, OriginalDataPoint } from 'meta/assessment'

import { useAppSelector } from 'client/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOriginalDataPoint = (): OriginalDataPoint => {
  const { countryIso } = useCountryRouteParams()
  const originalDataPoint = useAppSelector((state) => state.ui.originalDataPoint?.data)
  const originalDataPointTemplate = {
    countryIso,
    year: -1,
    dataSourceAdditionalComments: '',
    dataSourceMethods: [],
    dataSourceReferences: '',
    description: '',
    nationalClasses: [],
  } as OriginalDataPoint
  return originalDataPoint ?? originalDataPointTemplate
}

export const useIsOriginalDataPointUpdating = () => useAppSelector((state) => state.ui.originalDataPoint?.updating)

export const useOriginalDataPointReservedYears = () =>
  useAppSelector((state) => state.ui.originalDataPoint?.reservedYears)

export const useODPYears = (cycleName: CycleName): { years: Array<number>; reservedYears: Array<number> } => {
  const reservedYears = useOriginalDataPointReservedYears() ?? []

  return {
    years: Arrays.reverse(Arrays.range(1950, Number(cycleName))),
    reservedYears: reservedYears.map((reservedYear) => reservedYear.year),
  }
}
