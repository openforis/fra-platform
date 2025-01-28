import * as fs from 'fs/promises'
import * as path from 'path'
import { Request, Response } from 'express'

import { KioskController } from 'server/controller/kiosk'
import Requests from 'server/utils/requests'

export const getLatestActivities = async (_req: Request, res: Response) => {
  try {
    const localCsvFilePath = path.resolve(__dirname, '..', '..', 'static', 'kiosk', 'latestActivities.csv')

    const csvData = await fs.readFile(localCsvFilePath, 'utf-8')

    const latestActivities = await KioskController.getLatestActivitiesFromCsv({ csvData })

    Requests.sendOk(res, latestActivities)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
