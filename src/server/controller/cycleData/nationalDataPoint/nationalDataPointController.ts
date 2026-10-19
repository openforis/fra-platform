import { copyNationalClasses } from 'server/controller/cycleData/nationalDataPoint/copyNationalClasses'
import { create } from 'server/controller/cycleData/nationalDataPoint/create'
import { deleteNationalClass } from 'server/controller/cycleData/nationalDataPoint/deleteNationalClass'
import { getLastApproved } from 'server/controller/cycleData/nationalDataPoint/getLastApproved'
import { getVariables } from 'server/controller/cycleData/nationalDataPoint/getVariables'
import { remove } from 'server/controller/cycleData/nationalDataPoint/remove'
import { updateComments } from 'server/controller/cycleData/nationalDataPoint/updateComments'
import { updateDataSources } from 'server/controller/cycleData/nationalDataPoint/updateDataSources'
import { updateNationalClasses } from 'server/controller/cycleData/nationalDataPoint/updateNationalClasses'
import { updateOriginalData } from 'server/controller/cycleData/nationalDataPoint/updateOriginalData'
import { updateYear } from 'server/controller/cycleData/nationalDataPoint/updateYear'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

export const NationalDataPointController = {
  copyNationalClasses,
  create,
  deleteNationalClass,
  getLastApproved,
  getMany: OriginalDataPointRepository.getMany,
  getOne: OriginalDataPointRepository.getOne,
  getReservedYears: OriginalDataPointRepository.getReservedYears,
  getVariables,
  remove,
  updateComments,
  updateDataSources,
  updateNationalClasses,
  updateOriginalData,
  updateYear,
}
