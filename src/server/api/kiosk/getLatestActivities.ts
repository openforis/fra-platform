import axios from 'axios'
import { Request, Response } from 'express'

import { KioskController } from 'server/controller/kiosk'
import Requests from 'server/utils/requests'

export const getLatestActivities = async (_req: Request, res: Response) => {
  try {
    const spreadsheetId = '15HPJG9c8VQIiznk4eCkM5WV-1YaLDCwEH7jXprhfpH8'
    const gid = '0'
    const googleSheetsUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`

    const response = await axios.get(googleSheetsUrl, { responseType: 'text' })
    const csvData = response.data

    const latestActivities = await KioskController.getLatestActivitiesFromCsv({ csvData })

    Requests.sendOk(res, latestActivities)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
