import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { ProtectedAreaSource } from '@meta/geo'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getProtectedAreaLayer = async (
  req: Request<
    never,
    never,
    { countryIso: CountryIso; source: ProtectedAreaSource; params?: { assetId: string } },
    never
  >,
  res: Response
) => {
  try {
    const layer = await GeoController.getProtectedAreaLayer(req.body)

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
