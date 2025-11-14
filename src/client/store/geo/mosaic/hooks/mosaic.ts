import { MosaicOptions } from 'meta/geo/mosaic/options'

import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { MosaicSelectors } from 'client/store/geo/mosaic/selectors'
import { MosaicUrlTemplateData } from 'client/store/geo/mosaic/state'
import { useAppSelector } from 'client/store/hooks'

export const useMosaicUrlTemplateData = (): MosaicUrlTemplateData | undefined =>
  useAppSelector(MosaicSelectors.getUrlTemplateData)

export const useMosaicOptions = (): MosaicOptions => useAppSelector(MosaicSelectors.getOptions)

export const useMosaicSelected = (): boolean => useAppSelector(MosaicSelectors.getSelected)

export const useMosaicStatus = (): LayerFetchStatus | undefined => useAppSelector(MosaicSelectors.getStatus)
