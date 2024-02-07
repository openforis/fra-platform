import { Express } from 'express'
// @ts-ignore
import * as queue from 'express-queue'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'

import { getActivities } from './activities/getActivities'
import { getActivitiesCount } from './activities/getActivitiesCount'
import { createContact } from './contacts/create'
import { getContacts } from './contacts/getContacts'
import { removeContact } from './contacts/remove'
import { updateContact } from './contacts/update'
import { getDataSources } from './descriptions/getDataSources'
import { getDescription } from './descriptions/getDescription'
import { upsertDescription } from './descriptions/upsertDescription'
import { copyOriginalDataPointNationalClasses } from './originalDataPoint/copyOriginalDataPointNationalClasses'
import { createOriginalDataPoint } from './originalDataPoint/createOriginalDataPoint'
import { deleteOriginalDataPoint } from './originalDataPoint/deleteOriginalDataPoint'
import { deleteOriginalDataPointNationalClass } from './originalDataPoint/deleteOriginalDataPointNationalClass'
import { getLastUpdatedTimestamp } from './originalDataPoint/getLastUpdatedTimestamp'
import { getOriginalDataPoint } from './originalDataPoint/getOdp'
import { getOriginalDataPoints } from './originalDataPoint/getOriginalDataPoints'
import { getReservedYears } from './originalDataPoint/getReservedYears'
import { updateOriginalDataPointDataSources } from './originalDataPoint/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from './originalDataPoint/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from './originalDataPoint/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from './originalDataPoint/updateOriginalDataPointOriginalData'
import { updateOriginalDataPointYear } from './originalDataPoint/updateOriginalDataPointYear'
import { createFile } from './repository/createFile'
import { getManyRepository } from './repository/getManyRepository'
import { getRepositoryFile } from './repository/getRepositoryFile'
import { removeRepositoryItem } from './repository/removeRepositoryItem'
import { updateRepositoryItem } from './repository/updateRepositoryItem'
import { getReviewStatus } from './review/getReviewStatus'
import { getReviewSummary } from './review/getReviewSummary'
import { clearTable } from './table/clearTable'
import { estimateValues } from './table/estimateValues'
import { getNodeValuesEstimations } from './table/getNodeValuesEstimations'
import { getTableData } from './table/getTableData'
import { persistNodeValues } from './table/persistNodeValues'
import multer = require('multer')

const fileFilter = (_req: any, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  // eslint-disable-next-line no-param-reassign
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
  callback(null, true)
}

export const CycleDataApi = {
  init: (express: Express): void => {
    // Table
    express.get(ApiEndPoint.CycleData.Table.tableData(), AuthMiddleware.requireView, getTableData)
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
    express.get(ApiEndPoint.CycleData.descriptionsDataSources(), AuthMiddleware.requireView, getDataSources)
    express.get(ApiEndPoint.CycleData.descriptions(), AuthMiddleware.requireView, getDescription)
    express.put(ApiEndPoint.CycleData.descriptions(), AuthMiddleware.requireEditDescriptions, upsertDescription)

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
      AuthMiddleware.requireEditTableData,
      updateOriginalDataPointDataSources
    )
    express.put(
      ApiEndPoint.CycleData.OriginalDataPoint.description(),
      AuthMiddleware.requireEditTableData,
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

    express.get(
      ApiEndPoint.CycleData.OriginalDataPoint.lastUpdatedTimestamp(),
      AuthMiddleware.requireEditTableData,
      getLastUpdatedTimestamp
    )

    express.get(ApiEndPoint.CycleData.OriginalDataPoint.many(), AuthMiddleware.requireView, getOriginalDataPoints)

    // Review
    express.get(ApiEndPoint.CycleData.Review.status(), AuthMiddleware.requireView, getReviewStatus)
    express.get(ApiEndPoint.CycleData.Review.summary(), AuthMiddleware.requireView, getReviewSummary)

    // Activities
    express.get(ApiEndPoint.CycleData.activities(), AuthMiddleware.requireView, getActivities)
    express.get(ApiEndPoint.CycleData.activitiesCount(), AuthMiddleware.requireView, getActivitiesCount)

    // ext node
    // -- Contacts
    express.post(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditTableData, createContact)
    express.get(ApiEndPoint.CycleData.Contacts.many(), AuthMiddleware.requireView, getContacts)
    express.put(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditTableData, updateContact)
    express.delete(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditTableData, removeContact)

    // repository
    express.post(
      ApiEndPoint.CycleData.Repository.one(),
      multer({ fileFilter }).single('file'),
      AuthMiddleware.requireEditAssessmentFile,
      createFile
    )
    express.get(ApiEndPoint.CycleData.Repository.file(), AuthMiddleware.requireViewFile, getRepositoryFile)
    express.get(ApiEndPoint.CycleData.Repository.many(), AuthMiddleware.requireView, getManyRepository)
    express.patch(
      ApiEndPoint.CycleData.Repository.one(),
      multer({ fileFilter }).single('file'),
      AuthMiddleware.requireEditAssessmentFile,
      updateRepositoryItem
    )
    express.delete(
      ApiEndPoint.CycleData.Repository.one(),
      AuthMiddleware.requireEditAssessmentFile,
      removeRepositoryItem
    )
  },
}
