import * as path from 'path'
import { Request, Response } from 'express'

import Requests from 'server/utils/requests'

export const getLatestActivities = async (_req: Request, res: Response) => {
  try {
    res.sendFile(path.resolve(__dirname, '..', '..', 'static', 'kiosk', 'latestActivities.csv'))
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
