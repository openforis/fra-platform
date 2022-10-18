import { ForestOptions, ForestSources, MapPanel, MosaicOptions } from '@meta/geo'

import { useAppSelector } from '@client/store'

export const useMosaicUrl = (): string => useAppSelector((state) => state.geo?.mosaicUrl)

export const useMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions)

export const useSelectedPanel = (): MapPanel => useAppSelector((state) => state.geo?.selectedPanel)

export const useSelectedForestSource = (): ForestSources => useAppSelector((state) => state.geo?.selectedForestSource)

export const useForestSourceOptions = (): ForestOptions => useAppSelector((state) => state.geo?.forestOptions)
