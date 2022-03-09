import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { AssessmentName } from '@meta/assessment'
import { MailService } from '@server/service'
import { CountryIso } from '@meta/area'

export const AssessmentPostCountryStatus = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Assessment.countryStatus(), async (req: Request, res: Response) => {
      const { countryIso, name, cycleName } = req.params
      const { countryStatus, message } = req.body
      const { notifyUsers } = req.query
      try {
        const returnedCountryStatus = await AssessmentController.updateCountryStatus({
          countryStatus,
          countryIso,
          name: name as AssessmentName,
          cycleName,
        })

        if (notifyUsers) {
          await MailService.assessmentNotifyUsers({
            user: Requests.getRequestUser(req),
            countryIso: countryIso as CountryIso,
            countryStatus: returnedCountryStatus,
            url: Requests.serverUrl(req),
            assessmentName: name as AssessmentName,
            message,
          })
        }

        Requests.send(res, returnedCountryStatus)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
