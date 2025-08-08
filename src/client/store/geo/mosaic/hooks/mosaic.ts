import { CountryIso } from 'meta/area'
import { MosaicOptions } from 'meta/geo'

import { MosaicSelectors } from 'client/store/geo/mosaic/selectors'
import { useAppSelector } from 'client/store/hooks'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

export const useMosaicCountryUrl = (countryIso: CountryIso): string | undefined =>
  useAppSelector((state) => MosaicSelectors.getCountryUrl(state, countryIso))

export const useMosaicOptions = (): MosaicOptions => useAppSelector((state) => MosaicSelectors.getOptions(state))

export const useMosaicSelected = (): boolean | undefined =>
  useAppSelector((state) => MosaicSelectors.getSelected(state))

export const useMosaicStatus = (): LayerFetchStatus | undefined =>
  useAppSelector((state) => MosaicSelectors.getStatus(state))

export const useUiMosaicOptions = (): MosaicOptions => useAppSelector((state) => MosaicSelectors.getUiOptions(state))
