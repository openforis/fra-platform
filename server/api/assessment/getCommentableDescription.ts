import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { CommentableDescriptionName } from '@meta/assessment/commentableDescription'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getCommentableDescription = async (req: Request, res: Response) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso, name } = <
      Record<string, string> & { countryIso: CountryIso }
    >req.query

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })
    const commentableDescription = await CycleDataController.getCommentableDescription({
      countryIso,
      assessment,
      cycle,
      sectionName,
      name: name as CommentableDescriptionName,
    })

    Requests.send(res, commentableDescription)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
