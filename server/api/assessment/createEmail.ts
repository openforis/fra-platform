import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import * as repository from '@server/repository/assessment/assessmentRepository'
import { sendAssessmentNotification } from '@server/assessment/sendAssessmentNotification'
import * as Requests from '@server/utils/requestUtils'

export const AssessmentCreateEmail = {
  init: (express: Express): void => {
    express.post(
      '/api/assessment/:countryIso',
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const assessment = req.body
          const notifyUsers = req.query.notifyUsers === 'true'
          const isStatusChange = await db.transaction(repository.changeAssessment, [
            req.params.countryIso,
            req.user,
            assessment,
          ])
          if (isStatusChange && notifyUsers) {
            await sendAssessmentNotification(req.params.countryIso, assessment, req.user, Requests.serverUrl(req))
          }
          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
