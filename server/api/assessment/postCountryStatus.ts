import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'
import { AssessmentName, CountryStatus } from '@meta/assessment'
import { MailService } from '@server/service'
import { CountryIso } from '@meta/area'

export const AssessmentPostCountryStatus = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Assessment.countryStatus(), async (req: Request, res: Response) => {
      const { countryIso, name, cycleName } = req.params
      const { notifyUsers } = req.query
      try {
        const countryStatus = await AssessmentController.updateCountryStatus({
          countryStatus: req.body as CountryStatus,
          countryIso,
          name: name as AssessmentName,
          cycleName,
        })

        if (notifyUsers) {
          await MailService.assessmentNotifyUsers({
            user: Requests.getRequestUser(req),
            countryIso: countryIso as CountryIso,
            countryStatus,
            url: Requests.serverUrl(req),
            assessmentName: name as AssessmentName,
            message: '', // todo
          })
        }

        res.send(countryStatus)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
