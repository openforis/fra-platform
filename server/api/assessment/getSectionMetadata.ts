import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { AssessmentName } from '@meta/assessment'

export const getSectionMetadata = async (req: Request, res: Response) => {
  try {
    const { assessmentName, section, cycleName } = req.params

    const tablesMetadata = await AssessmentController.getSectionMetadata({
      cycleName,
      assessmentName: assessmentName as AssessmentName,
      section,
    })
    Requests.send(res, tablesMetadata)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
