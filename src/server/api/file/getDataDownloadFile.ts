import { Request, Response } from 'express'

import { FileRepository, fileTypes } from 'server/service/file'

type Query = {
  assessmentName: string
  cycleName: string
  fileName: string
  fileType: string
  language: string
}

export const getDataDownloadFile = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, fileName, fileType, language } = <Query>req.query
    FileRepository.download(res, fileTypes.dataDownload(assessmentName, cycleName, fileName, fileType), language)
  } catch (err) {
    res.status(500).send('An error occurred fetching the file.')
  }
}
