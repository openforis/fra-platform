import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

export const getAssessmentFile = async (req: CycleRequest, res: Response) => {
  try {
    const { uuid } = req.params

    const { assessmentName, cycleName, countryIso } = req.query
    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const assessmentFile = await FileController.getAssessmentFile({ assessment, cycle, countryIso, user, uuid })

    Responses.sendAssessmentFile(res, assessmentFile)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
