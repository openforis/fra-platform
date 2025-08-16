import { MosaicOptions } from 'meta/geo'

import { MosaicSelectors } from 'client/store/geo/mosaic/selectors'
import { MosaicUrlTemplateData } from 'client/store/geo/mosaic/state'
import { useAppSelector } from 'client/store/hooks'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

export const useMosaicUrlTemplateData = (): MosaicUrlTemplateData | undefined =>
  useAppSelector(MosaicSelectors.getUrlTemplateData)

export const useMosaicOptions = (): MosaicOptions => useAppSelector(MosaicSelectors.getOptions)

export const useMosaicSelected = (): boolean => useAppSelector(MosaicSelectors.getSelected)

export const useMosaicStatus = (): LayerFetchStatus | undefined => useAppSelector(MosaicSelectors.getStatus)
