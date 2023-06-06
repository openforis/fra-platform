import { Request, Response } from 'express'

import { FileRepository, fileTypes } from 'server/service/file'

type Query = {
  language: string
}

export const getUserGuideFile = async (req: Request, res: Response) => {
  try {
    const { language } = <Query>req.params
    FileRepository.download(res, fileTypes.userGuide, language)
  } catch (err) {
    res.status(500).send('An error occurred fetching the file.')
  }
}
