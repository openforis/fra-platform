import { ODP } from '@core/odp'
import { useAppSelector } from '../../../../store'

export const useODP = (): ODP => useAppSelector((state) => state.page.originalDataPoint.odp)
export const useODPs = (): Array<ODP> => useAppSelector((state) => state.page?.originalDataPoint?.odps ?? [])
