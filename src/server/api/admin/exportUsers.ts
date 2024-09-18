import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'
import { UserStatus } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const exportUsers = async (req: UsersRequest, res: Response) => {
  try {
    const {
      administrators,
      assessmentName,
      countries,
      cycleName,
      fullName,
      limit,
      offset,
      orderBy,
      orderByDirection,
      roles,
    } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const fileName = `users-${assessment.props.name}-${cycle.name}.csv`
    const user = Requests.getUser(req)
    const { lang } = user.props

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Type', 'text/csv')

    const csvStream = await UserController.exportToCsvStream({
      administrators,
      assessment,
      countries: countries || [],
      cycle,
      fullName: fullName || '',
      lang,
      limit: limit && Number(limit),
      offset: offset && Number(offset),
      orderBy,
      orderByDirection,
      roles: roles || [],
      statuses: [UserStatus.active, UserStatus.disabled, UserStatus.invitationPending],
    })

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
