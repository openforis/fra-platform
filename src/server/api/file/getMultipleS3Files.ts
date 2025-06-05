import * as path from 'path'
import { Request, Response } from 'express'
import { Objects } from 'utils/objects'

import { FileStorage } from 'server/service/fileStorage'
import { Requests } from 'server/utils'
import { Responses } from 'server/utils/responses'

export type GetMultipleS3FilesQuery = {
  paths: Array<string>
  fileName?: string
}

export const getMultipleS3Files = async (
  req: Request<unknown, unknown, unknown, GetMultipleS3FilesQuery>,
  res: Response
): Promise<void> => {
  try {
    const { fileName = 'multiple-files', paths } = req.query

    if (Objects.isEmpty(paths)) {
      Requests.send404(res)
      return
    }

    const files = await Promise.all(
      paths.map(async (s3path) => {
        const key = path.basename(s3path)
        const dir = `static/${path.dirname(s3path)}`
        const fileStream = await FileStorage.File.get({ path: dir, key })
        const chunks: Array<Buffer> = []
        await new Promise<void>((resolve, reject) => {
          fileStream.on('data', (chunk) => chunks.push(chunk))
          fileStream.on('end', () => resolve())
          fileStream.on('error', (err) => reject(err))
        })
        return { fileName: key, file: Buffer.concat(chunks) }
      })
    )
    await Responses.sendZip(res, files, fileName)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
