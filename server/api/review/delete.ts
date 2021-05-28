import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as reviewRepository from '@server/review/reviewRepository'
import { allowedToEditCommentsCheck } from '@server/assessment/assessmentEditAccessControl'
import * as db from '@server/db/db'
import { sendErr } from '@server/utils/requestUtils'

export const ReviewDelete = {
  init: (express: Express): void => {
    express.delete(
      '/api/review/:countryIso/comments/:commentId',
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
