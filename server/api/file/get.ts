import { Request, Response } from 'express'

import { FileRepository, fileTypes } from '@server/service/file'

export const getFile = async (req: Request, res: Response) => {
  try {
    const { countryIso, lang } = req.params
    FileRepository.download(res, fileTypes.statisticalFactsheets(countryIso), lang)
  } catch (err) {
    res.status(500).send('An error occurred fetching the file.')
  }
}
