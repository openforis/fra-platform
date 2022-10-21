// @ts-ignore
import { data, initialize } from '@google/earthengine'

const geePrivateKey = JSON.parse(process.env.GEE_PRIVATE_KEY ?? '{}')

export const authenticateToGee = async function () {
  return new Promise((resolve, reject) => {
    if (data.getAuthToken() === null) {
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
    } else {
      resolve()
    }
  })
}
