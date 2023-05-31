import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import Requests from 'server/utils/requests'

export const getSections = async (req: CycleRequest, res: Response) => {
  const { assessmentName, cycleName } = req.query
  try {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const sections = await MetadataController.getSections({ assessment, cycle })
    Requests.send(res, sections)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
