import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'

export const deleteOriginalDataPoint = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, odpId } = req.params

    const originalDataPoint = await AssessmentController.getOriginalDataPoint({
      name: assessmentName,
      cycleName,
      odpId: Number(odpId),
    })
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const returnedOriginalDataPoint = await AssessmentController.removeOriginalDataPoint({
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
