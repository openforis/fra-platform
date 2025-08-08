import { MosaicOptions } from 'meta/geo'

import { MosaicSelectors } from 'client/store/geo/mosaic/selectors'
import { useAppSelector } from 'client/store/hooks'

export const useMosaicOptions = (): MosaicOptions => useAppSelector((state) => MosaicSelectors.getOptions(state))
