import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'

export const updateOriginalDataPoint = async (req: Request, res: Response) => {
  try {
    const { name, cycleName } = req.params
    const { originalDataPoint } = req.body

    const assessment = await AssessmentController.read({ name })

    const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === cycleName)

    const returnedOriginalDataPoint = await AssessmentController.updateOriginalDataPoint({
      assessment,
      assessmentCycle,
      originalDataPoint,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
