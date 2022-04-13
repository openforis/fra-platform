import { AssessmentController } from '@server/controller/assessment'
import Requests from '@server/utils/requests'
import { Request, Response } from 'express'

export const getSectionMetadata = async (req: Request, res: Response) => {
  try {
    const { assessmentName, section, cycleName } = req.params
    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })
    const tablesMetadata = await AssessmentController.getSectionMetadata({ assessment, cycle, section })

    Requests.send(res, tablesMetadata)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
