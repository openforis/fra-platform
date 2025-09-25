import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { Country } from 'meta/area'

import { AreaController } from 'server/controller/area'
import { MailService } from 'server/service'
import Requests from 'server/utils/requests'

export const updateCountry = async (
  req: CycleRequest<{ notifySelf: string; notifyUsers: string }, { country: Country; message: string }>,
  res: Response
): Promise<void> => {
  try {
    const { countryIso, notifySelf: notifySelfReq, notifyUsers: notifyUsersReq } = req.query

    const notifyUsers = notifyUsersReq === 'true'
    const notifySelf = notifySelfReq === 'true'

    const { country, message } = req.body
    const { assessment, cycle } = req.context

    const user = Requests.getUser(req)
    const updateProps = { cycle, assessment, country, user, lastUpdate: true }
    const updatedCountry = await AreaController.updateCountry(updateProps)

    if (notifyUsers || notifySelf) {
      const assessmentName = assessment.props.name
      const notifyProps = { user, countryIso, assessmentName, country, cycle, message, notifyUsers, notifySelf }
      await MailService.assessmentNotifyUsers(notifyProps)
    }

    Requests.send(res, updatedCountry)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
