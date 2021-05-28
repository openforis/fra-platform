import { Express, Response, Request } from 'express'
import { downloadFile, fileTypes } from '@server/fileRepository/fileRepository'
import { sendErr } from '@server/utils/requestUtils'

export const FileRepositoryGetDataDownload = {
  init: (express: Express): void => {
    // data download
    express.get('/api/fileRepository/dataDownload/:key/:fileType', async (req: Request, res: Response) => {
      try {
        const { key, fileType } = req.params
        downloadFile(res, fileTypes.dataDownload(key, fileType), 'en')
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
