import { Request, Response } from 'express'

import { GeoController } from 'server/controller/geo'
import Requests from 'server/utils/requests'

export const getUNBoundariesLayer = async (_req: Request, res: Response): Promise<void> => {
  try {
    const layer = await GeoController.getUNBoundariesLayer()

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
