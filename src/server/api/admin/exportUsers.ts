import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const exportUsers = async (req: UsersRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const fileName = `users-${assessment.props.name}-${cycle.name}.csv`
    const user = Requests.getUser(req)
    const { lang } = user.props

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Type', 'text/csv')

    const csvStream = await UserController.exportToCsvStream({ assessment, cycle, lang })
    csvStream
      .on('error', (err) => {
        Requests.sendErr(res, err)
      })
      .pipe(res)
      .on('error', (err) => {
        Requests.sendErr(res, err)
      })
      .on('finish', res.end)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
