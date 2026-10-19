import { create } from 'server/db/repository/assessmentCycle/originalDataPoint/create'
import { deleteNationalClass } from 'server/db/repository/assessmentCycle/originalDataPoint/deleteNationalClass'
import { getBulkDownloadData } from 'server/db/repository/assessmentCycle/originalDataPoint/getBulkDownloadData'
import { getLastAccepted } from 'server/db/repository/assessmentCycle/originalDataPoint/getLastAccepted'
import { getMany } from 'server/db/repository/assessmentCycle/originalDataPoint/getMany'
import { getManyWithDescriptionLinks } from 'server/db/repository/assessmentCycle/originalDataPoint/getManyWithDescriptionLinks'
import { getManyWithReferenceLinks } from 'server/db/repository/assessmentCycle/originalDataPoint/getManyWithReferenceLinks'
import { getOne } from 'server/db/repository/assessmentCycle/originalDataPoint/getOne'
import { getReservedYears } from 'server/db/repository/assessmentCycle/originalDataPoint/getReservedYears'
import { remove } from 'server/db/repository/assessmentCycle/originalDataPoint/remove'
import { updateDescription } from 'server/db/repository/assessmentCycle/originalDataPoint/updateDescription'
import { updateNationalClasses } from 'server/db/repository/assessmentCycle/originalDataPoint/updateNationalClasses'
import { updateOriginalData } from 'server/db/repository/assessmentCycle/originalDataPoint/updateOriginalData'
import { updateYear } from 'server/db/repository/assessmentCycle/originalDataPoint/updateYear'

export const OriginalDataPointRepository = {
  create,
  deleteNationalClass,
  getBulkDownloadData,
  getLastAccepted,
  getMany,
  getManyWithDescriptionLinks,
  getManyWithReferenceLinks,
  getOne,
  getReservedYears,
  remove,
  updateDescription,
  updateNationalClasses,
  updateOriginalData,
  updateYear,
}
