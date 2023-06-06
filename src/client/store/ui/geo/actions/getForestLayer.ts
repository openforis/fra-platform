import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from 'meta/area'
import { LayerSource } from 'meta/geo'

export interface GenericLayerConfig {
  countryIso: CountryIso
  layer?: LayerSource
  layers?: never[]
}

export interface AgreementLayerConfig {
  countryIso: CountryIso
  layer?: never
  layers: LayerSource[]
  gteAgreementLevel: number
}

export type GetForestLayerRequestBody = GenericLayerConfig | AgreementLayerConfig

interface GetForestLayerProps {
  key: string
  uri: string
  body: GetForestLayerRequestBody
}

export const getForestLayer = createAsyncThunk<[string, string], GetForestLayerProps>('geo/get/forestLayer', async ({ key, uri, body }) => {
  const {
    data: { mapId },
  } = await axios({ method: 'POST', url: uri, data: body })
  return [key, mapId]
})
