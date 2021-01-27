import { getAllVersions, addVersion, deleteVersion, getLatestSchemaVersion } from './versioningRepository'
import { sendErr, getUserId } from '../utils/requestUtils'

import * as Auth from '../auth/authApiMiddleware'

export const init = (app: any) => {
  app.get('/versioning/', Auth.requireAdminPermission, async (req: any, res: any) => {
    const versions = await getAllVersions()
    res.json(versions)
  })

  app.post('/versioning/', Auth.requireAdminPermission, async (req: any, res: any) => {
    const userId = getUserId(req)
    const { versionNumber, publishedAt } = req.body
    try {
      if (!versionNumber || !publishedAt || !userId) {
        sendErr(res)
      }
      addVersion(userId, versionNumber, publishedAt)
      const versions = await getAllVersions()
      res.json(versions)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/versioning/:id', Auth.requireAdminPermission, async (req: any, res: any) => {
    const { id } = req.params
    if (!id) {
      return
    }

    try {
      await deleteVersion(id)
    } catch (error) {
      sendErr(res, error)
    }

    const versions = await getAllVersions()
    res.json(versions)
  })

  app.get('/versioning/latest', Auth.requireAdminPermission, async (req: any, res: any) => {
    const version = await getLatestSchemaVersion()
    res.json(version)
  })
}
