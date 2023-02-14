import { ForestOptions, MapPanel, MosaicOptions } from '@meta/geo'

import { useAppSelector } from '@client/store'

export const useMosaicUrl = (): string => useAppSelector((state) => state.geo?.mosaicUrl)

export const useMosaicSelected = (): boolean => useAppSelector((state) => state.geo?.mosaicSelected)

export const useMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions)

export const useSelectedPanel = (): MapPanel => useAppSelector((state) => state.geo?.selectedPanel)

export const useForestSourceOptions = (): ForestOptions => useAppSelector((state) => state.geo?.forestOptions)
