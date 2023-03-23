import { Response } from 'express'

import { ForestAgreementLayerRequest } from '@meta/api/request'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestAgreementLayer = async (req: ForestAgreementLayerRequest, res: Response) => {
  try {
    const layer = await GeoController.getForestAgreementLayer(req.body)

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
