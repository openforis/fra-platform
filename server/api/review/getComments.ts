import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as reviewRepository from '@server/review/reviewRepository'
import * as R from 'ramda'
import * as Requests from '@server/utils/requestUtils'

export const ReviewGetComments = {
  init: (express: Express): void => {
    express.get(
      '/api/review/:countryIso/:section',
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const result = await reviewRepository.getIssueComments(req.params.countryIso, req.params.section, req.user)

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const target = req.query.target && req.query.target.split(',')
          const issues = R.filter((comment: any) => R.pathEq(['target', 'params'], target, comment), result)

          if (issues.length > 0) await reviewRepository.updateIssueReadTime(issues[0].issueId, req.user)

          // leave out email
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          res.json(R.map((comment: any) => R.omit('email', comment), issues))
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
