import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { MetadataController } from 'server/controller/metadata'
import Requests from 'server/utils/requests'

export const getSections = async (req: CycleRequest, res: Response): Promise<void> => {
  const { assessment, cycle } = req.context

  try {
    const sections = await MetadataController.getSections({ assessment, cycle })
    Requests.send(res, sections)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
