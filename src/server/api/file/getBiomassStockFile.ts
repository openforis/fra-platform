import { Request, Response } from 'express'

import { FileRepository, fileTypes } from '@server/service/file'
import { Requests } from '@server/utils'

export const getBiomassStockFile = async (
  req: Request<never, never, never, { language: string; selectedDomain: string }>,
  res: Response
) => {
  try {
    const { language, selectedDomain: domain } = req.query
    FileRepository.download(res, fileTypes.biomassStock(domain), language)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
