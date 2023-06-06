import { Response } from 'express'

import { LayerRequest } from 'meta/api/request'

import { GeoController } from 'server/controller/geo'
import Requests from 'server/utils/requests'

export const getBurnedAreaLayer = async (req: LayerRequest, res: Response) => {
  try {
    const layer = await GeoController.getBurnedAreaLayer(req.body)
    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
