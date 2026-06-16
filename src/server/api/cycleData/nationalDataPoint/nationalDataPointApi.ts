import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { copyNationalClasses } from 'server/api/cycleData/nationalDataPoint/copyNationalClasses'
import { create } from 'server/api/cycleData/nationalDataPoint/create'
import { deleteNationalClass } from 'server/api/cycleData/nationalDataPoint/deleteNationalClass'
import { getLastApproved } from 'server/api/cycleData/nationalDataPoint/getLastApproved'
import { getMany } from 'server/api/cycleData/nationalDataPoint/getMany'
import { getOne } from 'server/api/cycleData/nationalDataPoint/getOne'
import { remove } from 'server/api/cycleData/nationalDataPoint/remove'
import { updateComments } from 'server/api/cycleData/nationalDataPoint/updateComments'
import { updateDataSources } from 'server/api/cycleData/nationalDataPoint/updateDataSources'
import { updateNationalClasses } from 'server/api/cycleData/nationalDataPoint/updateNationalClasses'
import { updateOriginalData } from 'server/api/cycleData/nationalDataPoint/updateOriginalData'
import { updateYear } from 'server/api/cycleData/nationalDataPoint/updateYear'
import { AuthMiddleware } from 'server/middleware/auth'

import { getReservedYears } from './getReservedYears'

export const NationalDataPointApi = {
  init: (express: Express): void => {
    // create
    express.post(ApiEndPoint.CycleData.NationalDataPoint.one(), AuthMiddleware.requireEditTableData, create)

    // read
    express.get(ApiEndPoint.CycleData.NationalDataPoint.history(), AuthMiddleware.requireViewHistory, getLastApproved)
    express.get(ApiEndPoint.CycleData.NationalDataPoint.many(), AuthMiddleware.requireView, getMany)
    express.get(ApiEndPoint.CycleData.NationalDataPoint.one(), AuthMiddleware.requireView, getOne)
    express.get(ApiEndPoint.CycleData.NationalDataPoint.reservedYears(), AuthMiddleware.requireView, getReservedYears)

    // update
    express.put(
      ApiEndPoint.CycleData.NationalDataPoint.copyNationalClasses(),
      AuthMiddleware.requireEditTableData,
      copyNationalClasses
    )
    express.put(
      ApiEndPoint.CycleData.NationalDataPoint.dataSources(),
      AuthMiddleware.requireEditDescriptions,
      updateDataSources
    )
    express.put(
      ApiEndPoint.CycleData.NationalDataPoint.description(),
      AuthMiddleware.requireEditDescriptions,
      updateComments
    )
    express.put(
      ApiEndPoint.CycleData.NationalDataPoint.originalData(),
      AuthMiddleware.requireEditTableData,
      updateOriginalData
    )
    express.put(ApiEndPoint.CycleData.NationalDataPoint.year(), AuthMiddleware.requireEditTableData, updateYear)
    express.put(
      ApiEndPoint.CycleData.NationalDataPoint.nationalClasses(),
      AuthMiddleware.requireEditTableData,
      updateNationalClasses
    )
    express.delete(
      ApiEndPoint.CycleData.NationalDataPoint.nationalClass(),
      AuthMiddleware.requireEditTableData,
      deleteNationalClass
    )

    // delete
    express.delete(ApiEndPoint.CycleData.NationalDataPoint.one(), AuthMiddleware.requireEditTableData, remove)
  },
}
