import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { countryLimits } from '@server/api/gee/utils/variables'
import { run } from '@server/api/gee/utils/auth'
// @ts-ignore
import ee from '@google/earthengine'

// Primarily for testing
export const GeeApiCountryGetLimits = {
  init: (express: Express): void => {
    const fn = async () => {
      const limits = ee.FeatureCollection(countryLimits.europe)

      const data = await new Promise((resolve) => {
        limits.evaluate((data: any) => {
          resolve(data)
          return data
        })
      })

      return data
    }

    express.get(ApiEndPoint.Gee.Country.limits(), async (req: Request, res: Response) => {
      run(req, res, fn)
    })
  },
}
