import * as path from 'path'
import { Request, Response } from 'express'

import { FileStorage, FileStorageUtils } from 'server/service/fileStorage'
import { Requests } from 'server/utils'
import { Responses } from 'server/utils/responses'

export const getStaticS3File = async (req: Request<{ s3path: string }>, res: Response): Promise<void> => {
  try {
    const { s3path } = req.params
    if (!s3path) {
      Requests.send404(res)
      return
    }
    const key = path.basename(s3path)
    const dir = `static/${path.dirname(s3path)}`
    const extension = path.extname(key).replace('.', '')
    const fileStream = await FileStorage.File.get({ path: dir, key })
    Responses.sendFileStream(res, key, fileStream, FileStorageUtils.getContentType(extension))
    return
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
