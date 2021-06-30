import { Express, Response, Request } from 'express'
import { OdpService } from '@server/service'
import { checkCountryAccessFromReqParams } from '@server/utils/accessControl'
import * as reviewRepository from '@server/repository/review/reviewRepository'
import * as R from 'ramda'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@core/country'

export const OdpGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Odp.get(), async (req: Request, res: Response) => {
      try {
        const odps = await OdpService.listAndValidateOriginalDataPoints({
          countryIso: req.params.countryIso as CountryIso,
        })

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
