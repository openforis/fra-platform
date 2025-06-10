import { copyNationalClasses } from 'client/store/data/originalDataPoint/actions/copyNationalClasses'
import { createOriginalDataPoint } from 'client/store/data/originalDataPoint/actions/createOriginalDataPoint'
import { deleteOriginalDataPoint } from 'client/store/data/originalDataPoint/actions/deleteOriginalDataPoint'
import { deleteOriginalDataPointNationalClass } from 'client/store/data/originalDataPoint/actions/deleteOriginalDataPointNationalClass'
import { getOriginalDataPoint } from 'client/store/data/originalDataPoint/actions/getOriginalDataPoint'
import { getOriginalDataPointReservedYears } from 'client/store/data/originalDataPoint/actions/getOriginalDataPointReservedYears'
import { reset } from 'client/store/data/originalDataPoint/actions/reset'
import { setReservedYears } from 'client/store/data/originalDataPoint/actions/setReservedYears'
import { updateOriginalDataPointDataSources } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointOriginalData'
import { updateOriginalDataPointYear } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointYear'

export const OriginalDataPointActions = {
  copyNationalClasses,
  createOriginalDataPoint,
  deleteOriginalDataPoint,
  deleteOriginalDataPointNationalClass,
  getOriginalDataPoint,
  getOriginalDataPointReservedYears,
  reset,
  setReservedYears,
  updateOriginalDataPointDataSources,
  updateOriginalDataPointDescription,
  updateOriginalDataPointNationalClasses,
  updateOriginalDataPointOriginalData,
  updateOriginalDataPointYear,
}
