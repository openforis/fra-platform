import { Response } from 'express'

import { ForestEstimationsRequest } from '@meta/api/request/geo/layer'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestEstimations = async (req: ForestEstimationsRequest, res: Response) => {
  try {
    const layer = await GeoController.getForestEstimations(req.query)
    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
