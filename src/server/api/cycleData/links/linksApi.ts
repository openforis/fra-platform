import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { exportLinks } from 'server/api/cycleData/links/exportLinks'
import { getLinksCount } from 'server/api/cycleData/links/getLinksCount'
import { getManyLinks } from 'server/api/cycleData/links/getManyLinks'
import { updateLink } from 'server/api/cycleData/links/updateLink'
import { verifyLinks } from 'server/api/cycleData/links/verifyLinks'
import { verifyStatus } from 'server/api/cycleData/links/verifyStatus'
import { verifySummary } from 'server/api/cycleData/links/verifySummary'
import { AuthMiddleware } from 'server/middleware/auth'

export const LinksApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.CycleData.Links.count(), AuthMiddleware.requireVerifyLinks, getLinksCount)
    express.get(ApiEndPoint.CycleData.Links.many(), AuthMiddleware.requireVerifyLinks, getManyLinks)
    express.get(ApiEndPoint.CycleData.Links.export(), AuthMiddleware.requireVerifyLinks, exportLinks)
    express.patch(ApiEndPoint.CycleData.Links.one(), AuthMiddleware.requireVerifyLinks, updateLink)
    express.post(ApiEndPoint.CycleData.Links.verify(), AuthMiddleware.requireVerifyLinks, verifyLinks)
    express.get(ApiEndPoint.CycleData.Links.verifySummary(), AuthMiddleware.requireVerifyLinks, verifySummary)
    express.get(ApiEndPoint.CycleData.Links.verifyStatus(), AuthMiddleware.requireVerifyLinks, verifyStatus)
  },
}
