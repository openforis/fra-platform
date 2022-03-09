import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'

export const getSections = async (req: Request, res: Response) => {
  const { assessmentName, cycleName } = req.params
  try {
    const sections = await AssessmentController.getSections({ name: assessmentName, cycleName })
    Requests.send(res, sections)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
