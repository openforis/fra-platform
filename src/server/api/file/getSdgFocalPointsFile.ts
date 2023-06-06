import { Request, Response } from 'express'

import { FileRepository, fileTypes } from 'server/service/file'

export const getSdgFocalPointsFile = async (_: Request, res: Response) => {
  try {
    FileRepository.download(res, fileTypes.sdgFocalPoints, 'en')
  } catch (err) {
    res.status(500).send('An error occurred fetching the file.')
  }
}
