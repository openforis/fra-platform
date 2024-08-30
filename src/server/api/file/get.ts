import { Request, Response } from 'express'

import { FileRepository, fileTypes } from 'server/service/file_deprecated'

type Query = {
  countryIso: string
  lang: string
}

export const getFile = async (req: Request, res: Response) => {
  try {
    const { countryIso, lang } = <Query>req.query
    FileRepository.download(res, fileTypes.statisticalFactsheets(countryIso), lang)
  } catch (err) {
    res.status(500).send('An error occurred fetching the file.')
  }
}
