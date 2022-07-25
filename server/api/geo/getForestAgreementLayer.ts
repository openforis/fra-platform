import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestAgreementLayer = async (req: Request, res: Response) => {
  try {
    const countryIso: CountryIso = req.params.countryIso as CountryIso
    const gteAgreementLevel = Number(req.params.gteAgreementLevel)
    const gteHansenTreeCoverPerc = Number(req.params.gteHansenTreeCoverPerc)

    const layer = await GeoController.getForestAgreementLayer({ countryIso, gteHansenTreeCoverPerc, gteAgreementLevel })

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
