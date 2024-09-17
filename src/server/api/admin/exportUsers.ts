import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

export const exportUsers = async (req: UsersRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const fileName = `users-${assessment.props.name}-${cycle.name}.csv`
    const user = Requests.getUser(req)
    const { lang } = user.props
    const fileBuffer = await UserController.exportToCsv({ assessment, cycle, lang })

    Responses.sendFile(res, fileName, fileBuffer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
