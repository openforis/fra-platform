import { Express, Response, Request } from 'express'
import { downloadFile, fileTypes } from '@server/service/fileRepository/fileRepository'
import { sendErr } from '@server/utils/requestUtils'
import { EndPoint } from '@server/api/endpoint'

export const FileRepositoryGetDataDownload = {
  init: (express: Express): void => {
    // data download
    express.get(EndPoint.FileRepository.getDataDownload, async (req: Request, res: Response) => {
      try {
        const { key, fileType } = req.params
        downloadFile(res, fileTypes.dataDownload(key, fileType), 'en')
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
