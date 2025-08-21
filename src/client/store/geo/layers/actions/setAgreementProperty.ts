import { createAction } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo'
import { KeyedValue } from 'meta/utils/generics'

import { AgreementLevelState } from 'client/store/geo/layers/state'

export type Params = KeyedValue<AgreementLevelState> & { layerKey: LayerKey }

export const setAgreementProperty = createAction<Params>('geo/layers/setAgreementProperty')
