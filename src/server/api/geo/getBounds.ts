import { Request, Response } from 'express'

import { CountryIso } from 'meta/area'

import { GeoController } from 'server/controller/geo'
import Requests from 'server/utils/requests'

export const getBounds = async (req: Request<never, never, never, { countryIso: CountryIso }>, res: Response) => {
  try {
    const bounds = await GeoController.getBounds(req.query)
    Requests.sendOk(res, bounds)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
