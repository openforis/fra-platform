import { Response } from 'express'

import { BiomassStockFileRequest } from 'meta/api/request'

import { FileRepository, fileTypes } from 'server/service/file'
import { Requests } from 'server/utils'

export const getBiomassStockFile = async (req: BiomassStockFileRequest, res: Response) => {
  try {
    const { language, assessmentName, cycleName, selectedDomain: domain } = req.params
    FileRepository.download(res, fileTypes.biomassStock(assessmentName, cycleName, domain), language)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
