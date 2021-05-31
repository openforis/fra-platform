import { Express, Response, Request } from 'express'
import { getFile } from '@server/repository/fileRepository/fileRepositoryRepository'
import { sendErr } from '@server/utils/requestUtils'

export const FileRepositoryGet = {
  init: (express: Express): void => {
    // get file
    express.get('/api/fileRepository/:countryIso/file/:fileId', async (req: Request, res: Response) => {
      try {
        const file = await getFile(req.params.fileId)

        if (file) {
          res.setHeader('Content-Disposition', `attachment; filename=${file.fileName}`)
          res.end(file.file, 'binary')
        } else {
          res.status(404).send('404 / Page not found')
        }
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
