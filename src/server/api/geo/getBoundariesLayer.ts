import { Request, Response } from 'express'

import { CountryIso } from 'meta/area'

import { GeoController } from 'server/controller/geo'
import Requests from 'server/utils/requests'

export const getBoundariesLayer = async (req: Request<never, never, never, { countryIso: CountryIso }>, res: Response) => {
  try {
    const { countryIso } = req.query

    const layer = await GeoController.getBoundariesLayer({ countryIso })

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
