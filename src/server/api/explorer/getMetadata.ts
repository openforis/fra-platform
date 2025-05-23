import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { ExplorerController } from 'server/controller/explorer'
import Requests from 'server/utils/requests'

type Request = CycleRequest<{ sectionNames: Array<string> }>

export const getMetadata = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, sectionNames } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const explorerMetadata = await ExplorerController.getMetadata({ assessment, cycle, sectionNames })

    Requests.send(res, explorerMetadata)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
