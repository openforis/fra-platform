import { Response } from 'express'

import { AssessmentController } from '@server/controller/assessment'
import { CycleRequest } from '@server/utils/request'
import Requests from '@server/utils/requests'

export const getSectionMetadata = async (req: CycleRequest<{ sectionNames: Array<string> }>, res: Response) => {
  try {
    const { assessmentName, sectionNames, cycleName } = req.query
    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const tablesMetadata = await AssessmentController.getSectionMetadata({ assessment, cycle, sectionNames })

    Requests.send(res, tablesMetadata)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
