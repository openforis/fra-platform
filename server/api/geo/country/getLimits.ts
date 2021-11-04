import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { countryLimits } from '@server/api/geo/utils/variables'
import { executeScript } from '@server/api/geo/utils/auth'
// eslint-disable-next-line
const ee = require('@google/earthengine')

// Primarily for testing
export const GeoApiCountryGetLimits = {
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

    express.get(ApiEndPoint.Geo.Country.limits(), async (req: Request, res: Response) => {
      executeScript(req, res, fn)
    })
  },
}
