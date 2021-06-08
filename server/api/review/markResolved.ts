import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as reviewRepository from '@server/repository/review/reviewRepository'
import { allowedToEditCommentsCheck } from '@server/assessment/assessmentEditAccessControl'
import * as db from '@server/db/db'
import { sendErr } from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const ReviewMarkResolved = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Review.markResolved(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const commentInfo = await reviewRepository.getIssueCountryAndSection(req.query.issueId)
          await allowedToEditCommentsCheck(commentInfo.countryIso, req.user, commentInfo.section)
          await db.transaction(reviewRepository.markIssueAsResolved, [
            commentInfo.countryIso,
            commentInfo.section,
            req.query.issueId,
            req.user,
          ])
          res.json({})
        } catch (err) {
          sendErr(res, err)
        }
      }
    )
  },
}
