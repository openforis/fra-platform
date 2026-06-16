import { Express } from 'express'
import multer from 'multer'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getDashboardItems } from 'server/api/cycleData/dashboard/getDashboardItems'
import { getHistory } from 'server/api/cycleData/history/getHistory'
import { getHistoryCount } from 'server/api/cycleData/history/getHistoryCount'
import { exportLinks } from 'server/api/cycleData/links/exportLinks'
import { getLinksCount } from 'server/api/cycleData/links/getLinksCount'
import { getManyLinks } from 'server/api/cycleData/links/getManyLinks'
import { updateLink } from 'server/api/cycleData/links/updateLink'
import { verifyLinks } from 'server/api/cycleData/links/verifyLinks'
import { verifyStatus } from 'server/api/cycleData/links/verifyStatus'
import { verifySummary } from 'server/api/cycleData/links/verifySummary'
import { AuthMiddleware } from 'server/middleware/auth'
import { FormDataBodyMiddleware } from 'server/middleware/formDataBodyMiddleware'

import { getActivities } from './activities/getActivities'
import { getActivitiesCount } from './activities/getActivitiesCount'
import { createContact } from './contacts/create'
import { getContacts } from './contacts/getContacts'
import { removeContact } from './contacts/remove'
import { updateContact } from './contacts/update'
import { createRepositoryItem } from './repository/createRepositoryItem'
import { getManyRepository } from './repository/getManyRepository'
import { getManyRepositoryFiles } from './repository/getManyRepositoryFiles'
import { getRepositoryFile } from './repository/getRepositoryFile'
import { getRepositoryFileMeta } from './repository/getRepositoryFileMeta'
import { removeRepositoryItem } from './repository/removeRepositoryItem'
import { updateRepositoryItem } from './repository/updateRepositoryItem'
import { getReviewStatus } from './review/getReviewStatus'
import { getReviewSummary } from './review/getReviewSummary'

export const CycleDataApi = {
  init: (express: Express): void => {
    // Review
    express.get(ApiEndPoint.CycleData.Review.status(), AuthMiddleware.requireView, getReviewStatus)
    express.get(ApiEndPoint.CycleData.Review.summary(), AuthMiddleware.requireView, getReviewSummary)

    // Country Links
    express.get(ApiEndPoint.CycleData.Links.count(), AuthMiddleware.requireVerifyLinks, getLinksCount)
    express.get(ApiEndPoint.CycleData.Links.many(), AuthMiddleware.requireVerifyLinks, getManyLinks)
    express.get(ApiEndPoint.CycleData.Links.export(), AuthMiddleware.requireVerifyLinks, exportLinks)
    express.patch(ApiEndPoint.CycleData.Links.one(), AuthMiddleware.requireVerifyLinks, updateLink)
    express.post(ApiEndPoint.CycleData.Links.verify(), AuthMiddleware.requireVerifyLinks, verifyLinks)
    express.get(ApiEndPoint.CycleData.Links.verifySummary(), AuthMiddleware.requireVerifyLinks, verifySummary)
    express.get(ApiEndPoint.CycleData.Links.verifyStatus(), AuthMiddleware.requireVerifyLinks, verifyStatus)

    // Activities
    express.get(ApiEndPoint.CycleData.activities(), AuthMiddleware.requireView, getActivities)
    express.get(ApiEndPoint.CycleData.activitiesCount(), AuthMiddleware.requireView, getActivitiesCount)

    // History
    express.get(ApiEndPoint.CycleData.History.Activities.one(), AuthMiddleware.requireViewHistory, getHistory)
    express.get(ApiEndPoint.CycleData.History.Activities.count(), AuthMiddleware.requireViewHistory, getHistoryCount)

    // ext node
    // -- Contacts
    express.post(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditDescriptions, createContact)
    express.get(ApiEndPoint.CycleData.Contacts.many(), AuthMiddleware.requireView, getContacts)
    express.put(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditDescriptions, updateContact)
    express.delete(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditDescriptions, removeContact)

    // repository
    express.post(
      ApiEndPoint.CycleData.Repository.one(),
      multer().none(),
      FormDataBodyMiddleware.parseBody,
      AuthMiddleware.requireEditRepositoryItem,
      createRepositoryItem
    )
    express.get(
      ApiEndPoint.CycleData.Repository.File.one(),
      AuthMiddleware.requireViewRepositoryItem,
      getRepositoryFile
    )
    express.get(ApiEndPoint.CycleData.Repository.File.many(), AuthMiddleware.requireView, getManyRepositoryFiles)
    express.get(
      ApiEndPoint.CycleData.Repository.fileMeta(),
      AuthMiddleware.requireEditRepositoryItem,
      getRepositoryFileMeta
    )
    express.get(ApiEndPoint.CycleData.Repository.many(), AuthMiddleware.requireView, getManyRepository)
    express.put(
      ApiEndPoint.CycleData.Repository.one(),
      multer().none(),
      FormDataBodyMiddleware.parseBody,
      AuthMiddleware.requireEditRepositoryItem,
      updateRepositoryItem
    )
    express.delete(
      ApiEndPoint.CycleData.Repository.one(),
      AuthMiddleware.requireEditRepositoryItem,
      removeRepositoryItem
    )

    // dashboard
    express.get(ApiEndPoint.CycleData.Dashboard.one(), getDashboardItems)
  },
}
