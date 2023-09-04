import { Request, Response } from 'express'

import { FileRepository } from 'server/service/file'
import { Requests } from 'server/utils'

type GetPrivateFileRequest = Request<never, never, never, { fileName: string }>

export const getPrivateFile = async (req: GetPrivateFileRequest, res: Response) => {
  try {
    const { fileName } = req.query
    FileRepository.downloadPrivateFile(res, fileName)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
