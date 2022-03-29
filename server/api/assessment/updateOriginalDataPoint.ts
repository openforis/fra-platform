import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'

export const updateOriginalDataPoint = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.params
    const { originalDataPoint } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const returnedOriginalDataPoint = await AssessmentController.updateOriginalDataPoint({
      assessment,
      assessmentCycle: cycle,
      originalDataPoint,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
