import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { MosaicOptions } from 'meta/geo'

import { _getUrlTemplateReqBody } from './_getUrlTemplateReqBody'

type Props = {
  countryIso: CountryIso
  mosaicOptions: MosaicOptions
}

type Returned = {
  countryIso: CountryIso
  urlTemplate: string
}

export const getUrlTemplate = createAsyncThunk<Returned, Props>('geo/mosaic/getUrlTemplate', async (params) => {
  const { countryIso, mosaicOptions } = params
  const body = _getUrlTemplateReqBody(mosaicOptions, countryIso)
  const { data } = await axios.post(`${ApiEndPoint.Geo.sepalProxy()}/preview`, body)
  const { urlTemplate } = data

  return {
    countryIso,
    urlTemplate,
  }
})
