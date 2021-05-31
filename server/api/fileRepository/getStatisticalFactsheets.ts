import { Express, Response, Request } from 'express'
import { downloadFile, fileTypes } from '@server/service/fileRepository/fileRepository'
import * as Requests from '@server/utils/requestUtils'

export const FileRepositoryGetStatisticalFactsheets = {
  init: (express: Express): void => {
    // statistical factsheets
    express.get('/api/fileRepository/statisticalFactsheets/:countryIso/:lang', async (req: Request, res: Response) => {
      try {
        const { countryIso, lang } = req.params
        downloadFile(res, fileTypes.statisticalFactsheets(countryIso), lang)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
