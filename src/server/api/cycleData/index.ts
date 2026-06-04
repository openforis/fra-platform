import { Express } from 'express'
// @ts-ignore
import queue from 'express-queue'
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
import { getDataSources } from './descriptions/getDataSources'
import { getDescription } from './descriptions/getDescription'
import { getDescriptionsHistory } from './descriptions/getDescriptionsHistory'
import { removeDataSource } from './descriptions/removeDataSource'
import { upsertDescription } from './descriptions/upsertDescription'
import { copyOriginalDataPointNationalClasses } from './originalDataPoint/copyOriginalDataPointNationalClasses'
import { createOriginalDataPoint } from './originalDataPoint/createOriginalDataPoint'
import { deleteOriginalDataPoint } from './originalDataPoint/deleteOriginalDataPoint'
import { deleteOriginalDataPointNationalClass } from './originalDataPoint/deleteOriginalDataPointNationalClass'
import { getOriginalDataPoint } from './originalDataPoint/getOdp'
import { getOriginalDataPointHistory } from './originalDataPoint/getOriginalDataPointHistory'
import { getOriginalDataPoints } from './originalDataPoint/getOriginalDataPoints'
import { getReservedYears } from './originalDataPoint/getReservedYears'
import { updateOriginalDataPointDataSources } from './originalDataPoint/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from './originalDataPoint/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from './originalDataPoint/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from './originalDataPoint/updateOriginalDataPointOriginalData'
import { updateOriginalDataPointYear } from './originalDataPoint/updateOriginalDataPointYear'
import { createRepositoryItem } from './repository/createRepositoryItem'
import { getManyRepository } from './repository/getManyRepository'
import { getManyRepositoryFiles } from './repository/getManyRepositoryFiles'
import { getRepositoryFile } from './repository/getRepositoryFile'
import { getRepositoryFileMeta } from './repository/getRepositoryFileMeta'
import { removeRepositoryItem } from './repository/removeRepositoryItem'
import { updateRepositoryItem } from './repository/updateRepositoryItem'
import { getReviewStatus } from './review/getReviewStatus'
import { getReviewSummary } from './review/getReviewSummary'
import { clearTable } from './table/clearTable'
import { estimateValues } from './table/estimateValues'
import { getNodeValuesEstimations } from './table/getNodeValuesEstimations'
import { getTableData } from './table/getTableData'
import { getTableDataHistory } from './table/getTableDataHistory'
import { persistNodeValues } from './table/persistNodeValues'

export const CycleDataApi = {
  init: (express: Express): void => {
    // Table
    express.get(ApiEndPoint.CycleData.Table.tableData(), AuthMiddleware.requireView, getTableData)
    express.get(ApiEndPoint.CycleData.Table.tableDataHistory(), AuthMiddleware.requireViewHistory, getTableDataHistory)
    express.get(
      ApiEndPoint.CycleData.Table.nodeValuesEstimations(),
      AuthMiddleware.requireEditTableData,
      getNodeValuesEstimations
    )
    express.patch(ApiEndPoint.CycleData.Table.nodes(), AuthMiddleware.requireEditTableData, persistNodeValues)
    express.post(
      ApiEndPoint.CycleData.Table.estimate(),
      queue({ activeLimit: 1 }),
      AuthMiddleware.requireEditTableData,
      estimateValues
    )
    express.post(ApiEndPoint.CycleData.Table.tableClear(), AuthMiddleware.requireEditTableData, clearTable)

    // Descriptions
    express.get(ApiEndPoint.CycleData.Descriptions.many(), AuthMiddleware.requireView, getDescription)
    express.get(ApiEndPoint.CycleData.Descriptions.history(), AuthMiddleware.requireViewHistory, getDescriptionsHistory)
    express.put(ApiEndPoint.CycleData.Descriptions.many(), AuthMiddleware.requireEditDescriptions, upsertDescription)
    express.get(ApiEndPoint.CycleData.Descriptions.DataSources.many(), AuthMiddleware.requireView, getDataSources)
    express.delete(
      ApiEndPoint.CycleData.Descriptions.DataSources.one(),
      AuthMiddleware.requireEditDescriptions,
      removeDataSource
    )

    // OriginalDataPoints
    express.get(ApiEndPoint.CycleData.OriginalDataPoint.reservedYears(), AuthMiddleware.requireView, getReservedYears)

    express.post(
      ApiEndPoint.CycleData.OriginalDataPoint.one(),
      AuthMiddleware.requireEditTableData,
      createOriginalDataPoint
    )
    express.delete(
      ApiEndPoint.CycleData.OriginalDataPoint.one(),
      AuthMiddleware.requireEditTableData,
      deleteOriginalDataPoint
    )
    express.get(ApiEndPoint.CycleData.OriginalDataPoint.one(), AuthMiddleware.requireView, getOriginalDataPoint)

    express.put(
      ApiEndPoint.CycleData.OriginalDataPoint.copyNationalClasses(),
      AuthMiddleware.requireEditTableData,
      copyOriginalDataPointNationalClasses
    )
    express.put(
      ApiEndPoint.CycleData.OriginalDataPoint.dataSources(),
      AuthMiddleware.requireEditDescriptions,
      updateOriginalDataPointDataSources
    )
    express.put(
      ApiEndPoint.CycleData.OriginalDataPoint.description(),
      AuthMiddleware.requireEditDescriptions,
      updateOriginalDataPointDescription
    )
    express.put(
      ApiEndPoint.CycleData.OriginalDataPoint.originalData(),
      AuthMiddleware.requireEditTableData,
      updateOriginalDataPointOriginalData
    )
    express.put(
      ApiEndPoint.CycleData.OriginalDataPoint.year(),
      AuthMiddleware.requireEditTableData,
      updateOriginalDataPointYear
    )
    express.get(
      ApiEndPoint.CycleData.OriginalDataPoint.history(),
      AuthMiddleware.requireViewHistory,
      getOriginalDataPointHistory
    )
    // OriginalDataPoint NationalClasses
    express.put(
      ApiEndPoint.CycleData.OriginalDataPoint.nationalClasses(),
      AuthMiddleware.requireEditTableData,
      updateOriginalDataPointNationalClasses
    )

    express.delete(
      ApiEndPoint.CycleData.OriginalDataPoint.nationalClass(),
      AuthMiddleware.requireEditTableData,
      deleteOriginalDataPointNationalClass
    )

    express.get(ApiEndPoint.CycleData.OriginalDataPoint.many(), AuthMiddleware.requireView, getOriginalDataPoints)

    // Print
    // PrintApi.init(express)

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
