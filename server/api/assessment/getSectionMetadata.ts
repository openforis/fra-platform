import { Request, Response } from 'express'

import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import Requests from '@server/utils/requests'

export const getSectionMetadata = async (req: Request, res: Response) => {
  try {
    const { assessmentName, sectionNames, cycleName } = <
      { sectionNames: Array<string>; assessmentName: AssessmentName; cycleName: string }
    >req.query
    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const tablesMetadata = await AssessmentController.getSectionMetadata({ assessment, cycle, sectionNames })

    Requests.send(res, tablesMetadata)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
