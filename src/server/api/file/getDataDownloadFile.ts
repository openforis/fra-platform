import { Request, Response } from 'express'

import { FileRepository, fileTypes } from 'server/service/file'

type Query = {
  fileName: string
  fileType: string
  language: string
}

export const getDataDownloadFile = async (req: Request, res: Response) => {
  try {
    const { fileName, fileType, language } = <Query>req.query
    FileRepository.download(res, fileTypes.dataDownload(fileName, fileType), language)
  } catch (err) {
    res.status(500).send('An error occurred fetching the file.')
  }
}
