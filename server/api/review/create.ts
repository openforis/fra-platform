import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as reviewRepository from '@server/repository/review/reviewRepository'
import { allowedToEditCommentsCheck } from '@server/assessment/assessmentEditAccessControl'
import * as db from '@server/db/db'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@server/api/endpoint'

export const ReviewCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Review.create,
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const commentInfo = await reviewRepository.getIssueCountryAndSection(req.params.issueId)
          await allowedToEditCommentsCheck(commentInfo.countryIso, req.user, commentInfo.section)
          await db.transaction(reviewRepository.createComment, [
            req.params.issueId,
            req.user,
            commentInfo.countryIso,
            commentInfo.section,
            req.body.msg,
            'opened',
          ])
          res.json({})
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
