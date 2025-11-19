import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { MetadataController } from 'server/controller/metadata'
import Requests from 'server/utils/requests'

export const getSections = async (req: CountryRequest, res: Response): Promise<void> => {
  const { assessment, cycle } = req.context

  try {
    const sections = await MetadataController.getSections({ assessment, cycle })
    Requests.send(res, sections)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
