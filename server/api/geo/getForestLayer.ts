import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { ForestSource } from '@meta/geo'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestLayer = async (req: Request, res: Response) => {
  try {
    const { countryIso, forestSource } = req.params as {
      countryIso: CountryIso
      forestSource: ForestSource
    }
    const gteHansenTreeCoverPerc = Number(req.params.gteHansenTreeCoverPerc)

    const layer = await GeoController.getForestLayer({ countryIso, forestSource, gteHansenTreeCoverPerc })

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
