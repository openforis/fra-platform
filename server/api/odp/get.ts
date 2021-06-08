import { Express, Response, Request } from 'express'
import * as odpRepository from '@server/repository/odp/odpRepository'
import { checkCountryAccessFromReqParams } from '@server/utils/accessControl'
import * as reviewRepository from '@server/repository/review/reviewRepository'
import * as R from 'ramda'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const OdpGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Odp.get(), async (req: Request, res: Response) => {
      try {
        const odps = await odpRepository.listAndValidateOriginalDataPoints(req.params.countryIso)

        if (req.user) {
          checkCountryAccessFromReqParams(req)

          const issues = odps.map((odp: any) =>
            reviewRepository
              .getIssuesSummary(req.params.countryIso, 'odp', odp.odpId, req.user, true)
              .then((_issues: any) => R.assoc('issuesSummary', _issues, odp))
          )
          const odpsWithIssues = await Promise.all(issues)

          res.json(odpsWithIssues)
        } else {
          res.json(odps)
        }
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
