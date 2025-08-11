import { MosaicOptions } from 'meta/geo'

import { MosaicSelectors } from 'client/store/geo/mosaic/selectors'
import { useAppSelector } from 'client/store/hooks'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

export const useMosaicUrlTemplate = (): string | undefined =>
  useAppSelector((state) => MosaicSelectors.getUrlTemplate(state))

export const useMosaicOptions = (): MosaicOptions => useAppSelector((state) => MosaicSelectors.getOptions(state))

export const useMosaicSelected = (): boolean | undefined =>
  useAppSelector((state) => MosaicSelectors.getSelected(state))

export const useMosaicStatus = (): LayerFetchStatus | undefined =>
  useAppSelector((state) => MosaicSelectors.getStatus(state))
