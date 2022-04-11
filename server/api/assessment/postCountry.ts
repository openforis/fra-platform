import { Request, Response } from 'express'

import Requests from '@server/utils/requests'
import { Country, CountryIso } from '@meta/area'
import { AssessmentController } from '@server/controller/assessment'
import { MailService } from '@server/service'
import { AssessmentName } from '@meta/assessment'

export const postCountry = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = <Record<string, string>>req.query
    const { notifyUsers } = req.query

    const { country, message } = <{ country: Country; message: string }>req.body
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const updatedCountry = await AssessmentController.updateCountry({
      countryIso: countryIso as CountryIso,
      cycle,
      assessment,
      country,
      user: Requests.getRequestUser(req),
    })

    if (notifyUsers === 'true') {
      await MailService.assessmentNotifyUsers({
        user: Requests.getRequestUser(req),
        countryIso: countryIso as CountryIso,
        country,
        url: Requests.serverUrl(req),
        assessmentName: assessmentName as AssessmentName,
        message,
      })
    }
    Requests.send(res, updatedCountry)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
