import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { allowedToEditCommentsCheck } from '@server/assessment/assessmentEditAccessControl'
import * as db from '@server/db/db'
import * as reviewRepository from '@server/repository/review/reviewRepository'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const ReviewCreateIssueWithComment = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Review.createIssueWithComments(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          // TODO: Should this be handled elsewhere?
          await allowedToEditCommentsCheck(req.params.countryIso, req.user, req.params.section)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const target = req.query.target ? req.query.target.split(',') : []
          await db.transaction(reviewRepository.createIssueWithComment, [
            req.params.countryIso,
            req.params.section,
            { params: target },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            req.user.id,
            req.body.msg,
          ])
          res.json({})
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
