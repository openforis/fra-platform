import { useAppSelector } from '@client/store'
import { MosaicOptions, MapPanel } from '@meta/geo'

export const useMosaicUrl = (): string => useAppSelector((state) => state.geo?.mosaicUrl)

export const useMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions)

export const useSelectedPanel = (): MapPanel => useAppSelector((state) => state.geo?.selectedPanel)
