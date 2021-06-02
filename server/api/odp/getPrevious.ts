import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { allowedToEditDataCheck } from '@server/assessment/assessmentEditAccessControl'
import * as odpRepository from '@server/repository/odp/odpRepository'
import * as R from 'ramda'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@server/api/endpoint'

export const OdpGetPrevious = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Odp.getPrevious,
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.query
          await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

          const resp = await odpRepository.listOriginalDataPoints(req.params.countryIso)

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const prevOdp: { odpId: string } = R.pipe(
            R.filter((o: any) => o.year !== 0 && o.year < req.params.year),
            R.sort((a: any, b: any) => b.year - a.year),
            R.head
          )(R.values(resp))

          if (prevOdp) {
            const odp = await odpRepository.getOdp(prevOdp.odpId)
            res.json(odp)
          } else {
            Requests.sendOk(res)
          }
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
