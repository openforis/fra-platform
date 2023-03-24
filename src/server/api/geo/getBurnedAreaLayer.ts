import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { BurnedAreaLayerSource } from '@meta/geo'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getBurnedAreaLayer = async (
  req: Request<
    never,
    never,
    {
      countryIso: CountryIso
      layer: BurnedAreaLayerSource
    },
    never
  >,
  res: Response
) => {
  try {
    const layer = await GeoController.getBurnedAreaLayer(req.body)
    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
