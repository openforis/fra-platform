import { Express, Response, Request } from 'express'
import { downloadFile, fileTypes } from '@server/service/fileRepository/fileRepository'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const FileRepositoryGetStatisticalFactsheets = {
  init: (express: Express): void => {
    // statistical factsheets
    express.get(ApiEndPoint.FileRepository.getStatisticalFactsheets(), async (req: Request, res: Response) => {
      try {
        const { countryIso, lang } = req.params
        downloadFile(res, fileTypes.statisticalFactsheets(countryIso), lang)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
