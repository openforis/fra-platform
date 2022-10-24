// @ts-ignore
import { data, initialize } from '@google/earthengine'
import { NextFunction, Request, Response } from 'express'

const geePrivateKey = JSON.parse(process.env.GEE_PRIVATE_KEY ?? '{}')

const authenticateToGee = async function () {
  return new Promise((resolve, reject) => {
    data.authenticateViaPrivateKey(
      geePrivateKey,
      () => {
        initialize(
          null,
          null,
          () => {
            resolve()
          },
          (err: any) => {
            reject(err)
          }
        )
      },
      (err: any) => {
        reject(err)
      }
    )
  })
}

export const checkGeeAuthentication = async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    if (data.getAuthToken() === null) await authenticateToGee()
    next()
  } catch (error) {
    next(error)
  }
}
