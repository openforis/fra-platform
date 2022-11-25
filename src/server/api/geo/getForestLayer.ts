import { Response } from 'express'

import { ForestLayerRequest } from '@meta/api/request'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestLayer = async (req: ForestLayerRequest, res: Response) => {
  try {
    const layer = await GeoController.getForestLayer(req.query)

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
