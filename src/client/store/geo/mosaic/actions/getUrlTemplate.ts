import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'

import { MosaicSelectors } from 'client/store/geo/mosaic/selectors'
import { MosaicUrlTemplateData } from 'client/store/geo/mosaic/state'
import { ThunkApiConfig } from 'client/store/types'

import { _getUrlTemplateReqBody } from './_getUrlTemplateReqBody'

type Props = {
  countryIso: CountryIso
}

export const getUrlTemplate = createAsyncThunk<MosaicUrlTemplateData, Props, ThunkApiConfig>(
  'geo/mosaic/getUrlTemplate',
  async (params, { getState }) => {
    const { countryIso } = params
    const state = getState()
    const mosaicOptions = MosaicSelectors.getOptions(state)
    const body = _getUrlTemplateReqBody(mosaicOptions, countryIso)
    const { data } = await axios.post(`${ApiEndPoint.Geo.sepalProxy()}/preview`, body)
    const url = data.urlTemplate

    return { url, requestOptions: Objects.cloneDeep(mosaicOptions) }
  }
)
