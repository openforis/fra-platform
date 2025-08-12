import { createAsyncThunk } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'

import { MosaicActions } from 'client/store/geo/mosaic/actions'
import { MosaicSelectors } from 'client/store/geo/mosaic/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Params = {
  countryIso: CountryIso
}

type Returned = {
  selected: boolean
}

export const toggleLayer = createAsyncThunk<Returned, Params, ThunkApiConfig>(
  'geo/mosaic/toggle',
  async (params, { dispatch, getState }) => {
    const state = getState()
    const currentSelected = MosaicSelectors.getSelected(state) ?? false
    const selected = !currentSelected
    const { countryIso } = params

    if (!selected) return { selected }

    const options = MosaicSelectors.getOptions(state)
    const urlTemplateData = MosaicSelectors.getUrlTemplateData(state)
    const { requestOptions } = urlTemplateData ?? {}
    const shouldFetchUrlTemplate = Objects.isEmpty(urlTemplateData) || !Objects.isEqual(options, requestOptions)
    if (shouldFetchUrlTemplate) dispatch(MosaicActions.getUrlTemplate({ countryIso }))

    return { selected }
  }
)
