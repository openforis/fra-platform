import { MosaicOptions } from 'meta/geo'

import { MosaicSelectors } from 'client/store/geo/mosaic/selectors'
import { MosaicUrlTemplateData } from 'client/store/geo/mosaic/state'
import { useAppSelector } from 'client/store/hooks'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

export const useMosaicUrlTemplateData = (): MosaicUrlTemplateData | undefined =>
  useAppSelector((state) => MosaicSelectors.getUrlTemplateData(state))

export const useMosaicOptions = (): MosaicOptions => useAppSelector((state) => MosaicSelectors.getOptions(state))

export const useMosaicSelected = (): boolean | undefined =>
  useAppSelector((state) => MosaicSelectors.getSelected(state))

export const useMosaicStatus = (): LayerFetchStatus | undefined =>
  useAppSelector((state) => MosaicSelectors.getStatus(state))
