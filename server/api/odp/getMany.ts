import { Express, Response, Request } from 'express'
import * as VersionService from '@server/service/versioning/service'
import * as R from 'ramda'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OdpService } from '@server/service'
import { CountryIso } from '@core/country'

export const OdpGetMany = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Odp.getMany(), async (req: Request, res: Response) => {
      try {
        const schemaName = await VersionService.getDatabaseSchema(req)

        const odpResult = R.isNil(req.query.odpId)
          ? { year: null }
          : await OdpService.getOdp({ odpId: req.query.odpId as string, schemaName })

        const odpsResult = await OdpService.listOriginalDataPoints({
          countryIso: req.query.countryIso as CountryIso,
          schemaName,
        })

        const result = R.merge(odpResult, {
          reservedYears: R.pipe(
            R.values,
            R.map(R.prop('year')),
            R.uniq,
            R.reject(R.equals(R.defaultTo(null, odpResult.year))) // odp's year is not reserved for the odp itself
          )(odpsResult),
        })
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
