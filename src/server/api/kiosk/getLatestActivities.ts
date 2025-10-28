import axios from 'axios'
import { Request, Response } from 'express'

import { KioskController } from 'server/controller/kiosk'
import { ProcessEnv } from 'server/utils'
import Requests from 'server/utils/requests'

export const getLatestActivities = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sheetUrl = ProcessEnv.kioskActivitiesSheetUrl
    const response = await axios.get(sheetUrl, { responseType: 'text' })
    const csvData = response.data

    const latestActivities = await KioskController.getLatestActivitiesFromCsv({ csvData })

    Requests.sendOk(res, latestActivities)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
