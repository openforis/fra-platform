import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestAgrLayer = async (req: Request, res: Response) => {
  try {
    const countryIso: CountryIso = req.params.countryIso as CountryIso
    const gteAgr: number = parseInt(req.params.gteAgr, 10)
    const gteHansenTreeCoverPerc: number = parseInt(req.params.gteHansenTreeCoverPerc, 10)

    const layer = await GeoController.getForestAgreementLayer({ countryIso, gteHansenTreeCoverPerc, gteAgr })

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
