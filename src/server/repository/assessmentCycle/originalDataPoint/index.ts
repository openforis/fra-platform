import { create } from './create'
import { deleteNationalClass } from './deleteNationalClass'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { getReservedYears } from './getReservedYears'
import { remove } from './remove'
import { updateDataSources } from './updateDataSources'
import { updateDescription } from './updateDescription'
import { updateNationalClasses } from './updateNationalClasses'
import { updateOriginalData } from './updateOriginalData'
import { updateYear } from './updateYear'

export const OriginalDataPointRepository = {
  create,
  getOne,
  getMany,
  getReservedYears,
  remove,
  updateDataSources,
  deleteNationalClass,
  updateDescription,
  updateNationalClasses,
  updateOriginalData,
  updateYear,
}
