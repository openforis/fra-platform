import { ApiAuthMiddleware } from '@server/api/middleware'
import * as reviewRepository from '@server/repository/review/reviewRepository'
import { Requests } from '@server/utils'

import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'

export const ReviewGetSummary = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Review.getSummary(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const result = await reviewRepository.getIssuesSummary(
            req.params.countryIso,
            req.params.section,
            req.query.target,
            req.user
          )
          res.json(result)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
