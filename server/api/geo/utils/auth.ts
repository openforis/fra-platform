import { Response, Request } from 'express'
import { Requests } from '@server/utils'
// @ts-ignore
import ee from '@google/earthengine'

const privateKey = JSON.parse(process.env.FRA_GOOGLE_SERVICE_ACCOUNT_KEY)

// The authenticating structure to run all GEE computations through
export const executeScript = async (req: Request, res: Response, cloudFn: (req: Request) => any) => {
  try {
    ee.data.authenticateViaPrivateKey(
      privateKey,
      async () => {
        ee.initialize(null, null, async () => {
          const data = await cloudFn(req)
          res.json(data)
        })
      },
      (error: string) => {
        throw error
      }
    )
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
