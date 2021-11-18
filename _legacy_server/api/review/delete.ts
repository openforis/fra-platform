import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as reviewRepository from '@server/repository/review/reviewRepository'
import { allowedToEditCommentsCheck } from '@server/assessment/assessmentEditAccessControl'
import * as db from '@server/db/db_deprecated'
import { sendErr } from '@server/utils/requests'
import { ApiEndPoint } from '@common/api/endpoint'

export const ReviewDelete = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.Review.delete(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const commentInfo = await reviewRepository.getCommentCountryAndSection(req.params.commentId)
          await allowedToEditCommentsCheck(commentInfo.countryIso, req.user, commentInfo.section)
          await db.transaction(reviewRepository.markCommentAsDeleted, [
            commentInfo.countryIso,
            commentInfo.section,
            req.params.commentId,
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
